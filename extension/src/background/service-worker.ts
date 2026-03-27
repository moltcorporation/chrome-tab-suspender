import { isProActive, checkLicense } from "../pro/license";

const SUSPENDED_PREFIX = chrome.runtime.getURL("suspended/suspended.html");
const ALARM_NAME = "idle-check";
const DEFAULT_TIMEOUT_MINUTES = 30;

// ── Installation ──────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Tab Suspender installed");
  // Initialize default settings
  const data = await chrome.storage.sync.get("settings");
  if (!data.settings) {
    await chrome.storage.sync.set({
      settings: {
        timeoutMinutes: DEFAULT_TIMEOUT_MINUTES,
        protectPinned: true,
        protectAudible: true,
      },
    });
  }
  // Start the idle check alarm
  await chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });
  await updateBadge();
});

// Ensure alarm exists on startup (service worker can be killed and restarted)
chrome.runtime.onStartup.addListener(async () => {
  await chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });
  await updateBadge();
});

// ── Tab activity tracking ─────────────────────────────────────

// Track when tabs become active
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await markTabActive(activeInfo.tabId);
});

// Track when tabs are updated (navigation, reload)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete" || changeInfo.audible !== undefined) {
    await markTabActive(tabId);
  }
  await updateBadge();
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  // Clean up tracking data
  await chrome.storage.local.remove(`tab_active_${tabId}`);
  await updateBadge();
});

async function markTabActive(tabId: number) {
  await chrome.storage.local.set({
    [`tab_active_${tabId}`]: Date.now(),
  });
}

// ── Alarm: auto-suspend idle tabs ─────────────────────────────

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;
  await autoSuspendIdleTabs();
});

async function autoSuspendIdleTabs() {
  const data = await chrome.storage.sync.get(["settings", "whitelist"]);
  const settings = data.settings || { timeoutMinutes: DEFAULT_TIMEOUT_MINUTES, protectPinned: true, protectAudible: true };
  const whitelist: string[] = data.whitelist || [];
  const timeoutMs = settings.timeoutMinutes * 60 * 1000;
  const now = Date.now();

  const tabs = await chrome.tabs.query({});
  // Get the active tab in each window so we never suspend it
  const windows = await chrome.windows.getAll();
  const activeTabIds = new Set<number>();
  for (const win of windows) {
    const [activeTab] = await chrome.tabs.query({ active: true, windowId: win.id });
    if (activeTab?.id) activeTabIds.add(activeTab.id);
  }

  for (const tab of tabs) {
    if (!tab.id || !tab.url) continue;
    if (activeTabIds.has(tab.id)) continue;
    if (!canSuspend(tab, settings)) continue;
    if (isWhitelisted(tab.url, whitelist)) continue;

    // Check last activity time
    const key = `tab_active_${tab.id}`;
    const stored = await chrome.storage.local.get(key);
    const lastActive = stored[key] as number | undefined;

    if (!lastActive) {
      // No recorded activity — mark now and skip this round
      await markTabActive(tab.id);
      continue;
    }

    if (now - lastActive >= timeoutMs) {
      await suspendTab(tab.id, tab.url, tab.title || "");
      await chrome.storage.local.remove(key);
    }
  }

  await updateBadge();
}

// ── Message handler ───────────────────────────────────────────

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

  if (msg.type === "get-settings") {
    chrome.storage.sync.get(["settings", "whitelist"]).then(sendResponse);
    return true;
  }

  if (msg.type === "save-settings") {
    chrome.storage.sync.set({ settings: msg.settings }).then(() => {
      sendResponse({ ok: true });
    });
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

// ── Keyboard shortcut ─────────────────────────────────────────

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "suspend-current-tab") {
    await suspendCurrentTab();
  }
});

// ── Core functions ────────────────────────────────────────────

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
  const data = await chrome.storage.sync.get("settings");
  const settings = data.settings || { protectPinned: true, protectAudible: true };
  if (tab?.id && tab.url && canSuspend(tab, settings)) {
    await suspendTab(tab.id, tab.url, tab.title || "");
  }
  return { ok: true };
}

async function suspendAllTabs() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const data = await chrome.storage.sync.get(["whitelist", "settings"]);
  const whitelist: string[] = data.whitelist || [];
  const settings = data.settings || { protectPinned: true, protectAudible: true };
  const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTabId = activeTab[0]?.id;

  for (const tab of tabs) {
    if (tab.id === activeTabId) continue;
    if (!tab.id || !tab.url) continue;
    if (!canSuspend(tab, settings)) continue;
    if (isWhitelisted(tab.url, whitelist)) continue;
    await suspendTab(tab.id, tab.url, tab.title || "");
  }

  await updateBadge();
  return { ok: true };
}

interface Settings {
  protectPinned?: boolean;
  protectAudible?: boolean;
  timeoutMinutes?: number;
}

function canSuspend(tab: chrome.tabs.Tab, settings: Settings): boolean {
  if (!tab.url) return false;
  if (tab.url.startsWith(SUSPENDED_PREFIX)) return false;
  if (tab.url.startsWith("chrome://")) return false;
  if (tab.url.startsWith("chrome-extension://")) return false;
  if (tab.url.startsWith("about:")) return false;
  if (settings.protectPinned !== false && tab.pinned) return false;
  if (settings.protectAudible !== false && tab.audible) return false;
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

// ── Badge ─────────────────────────────────────────────────────

async function updateBadge() {
  const { suspended } = await getStats();
  await chrome.action.setBadgeText({
    text: suspended > 0 ? String(suspended) : "",
  });
  await chrome.action.setBadgeBackgroundColor({ color: "#34d399" });
}

