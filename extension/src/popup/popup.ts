const API_BASE = "https://chrome-tab-suspender-moltcorporation.vercel.app";

document.addEventListener("DOMContentLoaded", async () => {
  const suspendedCount = document.getElementById("suspended-count")!;
  const activeCount = document.getElementById("active-count")!;
  const suspendBtn = document.getElementById("suspend-btn")!;
  const suspendAllBtn = document.getElementById("suspend-all-btn")!;
  const whitelistToggle = document.getElementById("whitelist-toggle") as HTMLInputElement;
  const proBadge = document.getElementById("pro-badge")!;
  const upgradeBanner = document.getElementById("upgrade-banner")!;
  const upgradeBtn = document.getElementById("upgrade-btn")!;
  const licenseSection = document.getElementById("license-section")!;
  const licenseInput = document.getElementById("license-key-input") as HTMLInputElement;
  const activateBtn = document.getElementById("activate-btn")!;
  const proFeatures = document.getElementById("pro-features")!;
  const manageBtn = document.getElementById("manage-btn")!;
  const settingsBtn = document.getElementById("settings-btn")!;
  const statusEl = document.getElementById("status")!;

  // Open settings page
  settingsBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // Get tab counts from service worker
  const response = await chrome.runtime.sendMessage({ type: "get-stats" });
  if (response) {
    suspendedCount.textContent = String(response.suspended || 0);
    activeCount.textContent = String(response.active || 0);
  }

  // Check current domain whitelist status
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url) {
    try {
      const domain = new URL(tab.url).hostname;
      const data = await chrome.storage.sync.get("whitelist");
      const whitelist: string[] = data.whitelist || [];
      whitelistToggle.checked = whitelist.includes(domain);
    } catch {
      // Ignore invalid URLs
    }
  }

  // Check Pro status
  const proData = await chrome.storage.sync.get(["licenseKey", "isPro"]);
  if (proData.licenseKey && proData.isPro) {
    showProUI();
  }

  // Suspend current tab
  suspendBtn.addEventListener("click", async () => {
    await chrome.runtime.sendMessage({ type: "suspend-tab" });
    window.close();
  });

  // Suspend all tabs
  suspendAllBtn.addEventListener("click", async () => {
    await chrome.runtime.sendMessage({ type: "suspend-all" });
    showStatus("All eligible tabs suspended");
  });

  // Whitelist toggle
  whitelistToggle.addEventListener("change", async () => {
    if (!tab?.url) return;
    try {
      const domain = new URL(tab.url).hostname;
      const data = await chrome.storage.sync.get(["whitelist", "isPro"]);
      const whitelist: string[] = data.whitelist || [];
      const isPro = data.isPro || false;
      const maxWhitelist = isPro ? Infinity : 5;

      if (whitelistToggle.checked) {
        if (!isPro && whitelist.length >= maxWhitelist) {
          whitelistToggle.checked = false;
          showStatus("Free tier: max 5 domains. Upgrade to Pro for unlimited.", true);
          return;
        }
        if (!whitelist.includes(domain)) {
          whitelist.push(domain);
        }
      } else {
        const idx = whitelist.indexOf(domain);
        if (idx > -1) whitelist.splice(idx, 1);
      }
      await chrome.storage.sync.set({ whitelist });
      showStatus(whitelistToggle.checked ? `${domain} whitelisted` : `${domain} removed`);
    } catch {
      // Ignore
    }
  });

  // Upgrade button — show license input and open pricing page
  upgradeBtn.addEventListener("click", () => {
    upgradeBanner.style.display = "none";
    licenseSection.style.display = "flex";
    chrome.tabs.create({ url: `${API_BASE}/#pricing` });
  });

  // Activate license key
  activateBtn.addEventListener("click", async () => {
    const key = licenseInput.value.trim();
    if (!key) {
      showStatus("Enter a license key", true);
      return;
    }

    activateBtn.textContent = "...";
    try {
      const resp = await fetch(
        `${API_BASE}/api/license/check?key=${encodeURIComponent(key)}`
      );
      const data = await resp.json();

      if (data.valid) {
        await chrome.storage.sync.set({ licenseKey: key, isPro: true });
        showProUI();
        showStatus("Pro activated!");
      } else {
        showStatus("Invalid or expired license key", true);
      }
    } catch {
      showStatus("Could not verify license. Check your connection.", true);
    }
    activateBtn.textContent = "Activate";
  });

  // Manage subscription
  manageBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: `${API_BASE}/#pricing` });
  });

  function showProUI() {
    proBadge.style.display = "inline";
    upgradeBanner.style.display = "none";
    licenseSection.style.display = "none";
    proFeatures.style.display = "block";
  }

  function showStatus(msg: string, isError = false) {
    statusEl.textContent = msg;
    statusEl.className = isError ? "status error" : "status";
    statusEl.style.display = "block";
    setTimeout(() => {
      statusEl.style.display = "none";
    }, 3000);
  }
});
