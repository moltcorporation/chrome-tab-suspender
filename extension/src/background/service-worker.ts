import { isProActive, checkLicense } from "../pro/license";

const SUSPENDED_PREFIX = chrome.runtime.getURL("suspended/suspended.html");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Tab Suspender installed");
});

// Message handler for popup and content scripts
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "get-stats") {
    getStats().then(sendResponse);
    return true;
  }

  if (msg.type === "suspend-tab") {
    suspendCurrentTab().then(sendResponse);
    return true;
  }

  if (msg.type === "suspend-all") {
    suspendAllTabs().then(sendResponse);
    return true;
  }

  if (msg.type === "check-pro") {
    isProActive().then((isPro) => sendResponse({ isPro }));
    return true;
  }

  if (msg.type === "login-pro") {
    checkLicense(msg.licenseKey).then((result) => {
      if (result.valid) {
        chrome.storage.sync.set({ licenseKey: msg.licenseKey, isPro: true });
      }
      sendResponse(result);
    });
    return true;
  }

  if (msg.type === "logout-pro") {
    chrome.storage.sync.remove(["licenseKey", "isPro"]);
    chrome.storage.local.remove("pro_license");
    sendResponse({ ok: true });
    return true;
  }

  return false;
});

async function getStats() {
  const tabs = await chrome.tabs.query({});
  let suspended = 0;
  let active = 0;

  for (const tab of tabs) {
    if (tab.url?.startsWith(SUSPENDED_PREFIX)) {
      suspended++;
    } else {
      active++;
    }
  }

  return { suspended, active };
}

async function suspendCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id && tab.url && canSuspend(tab)) {
    await suspendTab(tab.id, tab.url, tab.title || "");
  }
  return { ok: true };
}

async function suspendAllTabs() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const data = await chrome.storage.sync.get(["whitelist", "isPro"]);
  const whitelist: string[] = data.whitelist || [];
  const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTabId = activeTab[0]?.id;

  for (const tab of tabs) {
    if (tab.id === activeTabId) continue;
    if (!tab.id || !tab.url) continue;
    if (!canSuspend(tab)) continue;
    if (isWhitelisted(tab.url, whitelist)) continue;
    await suspendTab(tab.id, tab.url, tab.title || "");
  }

  return { ok: true };
}

function canSuspend(tab: chrome.tabs.Tab): boolean {
  if (!tab.url) return false;
  if (tab.url.startsWith(SUSPENDED_PREFIX)) return false;
  if (tab.url.startsWith("chrome://")) return false;
  if (tab.url.startsWith("chrome-extension://")) return false;
  if (tab.url.startsWith("about:")) return false;
  if (tab.pinned) return false;
  if (tab.audible) return false;
  return true;
}

function isWhitelisted(url: string, whitelist: string[]): boolean {
  try {
    const domain = new URL(url).hostname;
    return whitelist.some(
      (w) => domain === w || domain.endsWith(`.${w}`)
    );
  } catch {
    return false;
  }
}

async function suspendTab(tabId: number, url: string, title: string) {
  const suspendedUrl = `${SUSPENDED_PREFIX}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  await chrome.tabs.update(tabId, { url: suspendedUrl });
}

// Update badge with suspended count
async function updateBadge() {
  const { suspended } = await getStats();
  await chrome.action.setBadgeText({
    text: suspended > 0 ? String(suspended) : "",
  });
  await chrome.action.setBadgeBackgroundColor({ color: "#34d399" });
}

// Listen for tab updates to keep badge current
chrome.tabs.onUpdated.addListener(() => {
  updateBadge();
});

chrome.tabs.onRemoved.addListener(() => {
  updateBadge();
});
