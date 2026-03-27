document.addEventListener("DOMContentLoaded", async () => {
  const timeoutSelect = document.getElementById("timeout-select") as HTMLSelectElement;
  const protectPinned = document.getElementById("protect-pinned") as HTMLInputElement;
  const protectAudible = document.getElementById("protect-audible") as HTMLInputElement;
  const whitelistContainer = document.getElementById("whitelist-container")!;
  const whitelistEmpty = document.getElementById("whitelist-empty")!;
  const domainInput = document.getElementById("domain-input") as HTMLInputElement;
  const addDomainBtn = document.getElementById("add-domain-btn")!;
  const whitelistLimit = document.getElementById("whitelist-limit")!;
  const statusEl = document.getElementById("status")!;

  // Load current settings
  const data = await chrome.runtime.sendMessage({ type: "get-settings" });
  const settings = data?.settings || { timeoutMinutes: 30, protectPinned: true, protectAudible: true };
  const whitelist: string[] = data?.whitelist || [];

  const proData = await chrome.storage.sync.get(["isPro"]);
  const isPro = proData.isPro || false;
  const maxWhitelist = isPro ? Infinity : 5;

  // Apply loaded settings to UI
  timeoutSelect.value = String(settings.timeoutMinutes || 30);
  protectPinned.checked = settings.protectPinned !== false;
  protectAudible.checked = settings.protectAudible !== false;

  renderWhitelist(whitelist);
  updateWhitelistLimit(whitelist);

  // Save settings on change
  timeoutSelect.addEventListener("change", saveSettings);
  protectPinned.addEventListener("change", saveSettings);
  protectAudible.addEventListener("change", saveSettings);

  async function saveSettings() {
    const newSettings = {
      timeoutMinutes: parseInt(timeoutSelect.value, 10),
      protectPinned: protectPinned.checked,
      protectAudible: protectAudible.checked,
    };
    await chrome.runtime.sendMessage({ type: "save-settings", settings: newSettings });
    showStatus("Settings saved");
  }

  // Add domain
  addDomainBtn.addEventListener("click", addDomain);
  domainInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addDomain();
  });

  async function addDomain() {
    const raw = domainInput.value.trim().toLowerCase();
    if (!raw) return;

    // Strip protocol and path
    let domain = raw;
    try {
      if (raw.includes("://")) {
        domain = new URL(raw).hostname;
      } else if (raw.includes("/")) {
        domain = raw.split("/")[0];
      }
    } catch {
      // Use as-is
    }

    if (whitelist.includes(domain)) {
      showStatus("Domain already whitelisted", true);
      return;
    }

    if (!isPro && whitelist.length >= maxWhitelist) {
      showStatus("Free tier: max 5 domains. Upgrade to Pro for unlimited.", true);
      return;
    }

    whitelist.push(domain);
    await chrome.storage.sync.set({ whitelist });
    domainInput.value = "";
    renderWhitelist(whitelist);
    updateWhitelistLimit(whitelist);
    showStatus(`${domain} added to whitelist`);
  }

  async function removeDomain(domain: string) {
    const idx = whitelist.indexOf(domain);
    if (idx > -1) {
      whitelist.splice(idx, 1);
      await chrome.storage.sync.set({ whitelist });
      renderWhitelist(whitelist);
      updateWhitelistLimit(whitelist);
      showStatus(`${domain} removed`);
    }
  }

  function renderWhitelist(list: string[]) {
    // Remove existing items but keep the empty message
    const items = whitelistContainer.querySelectorAll(".whitelist-item");
    items.forEach((el) => el.remove());

    if (list.length === 0) {
      whitelistEmpty.style.display = "block";
      return;
    }

    whitelistEmpty.style.display = "none";
    for (const domain of list) {
      const row = document.createElement("div");
      row.className = "whitelist-item";
      row.innerHTML = `
        <span class="whitelist-domain">${escapeHtml(domain)}</span>
        <button class="remove-btn" title="Remove">&times;</button>
      `;
      row.querySelector(".remove-btn")!.addEventListener("click", () => removeDomain(domain));
      whitelistContainer.appendChild(row);
    }
  }

  function updateWhitelistLimit(list: string[]) {
    if (isPro) {
      whitelistLimit.style.display = "none";
      return;
    }
    whitelistLimit.style.display = "block";
    whitelistLimit.textContent = `${list.length} / 5 domains (free tier)`;
  }

  function escapeHtml(str: string): string {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function showStatus(msg: string, isError = false) {
    statusEl.textContent = msg;
    statusEl.className = isError ? "status error" : "status";
    statusEl.style.display = "block";
    setTimeout(() => {
      statusEl.style.display = "none";
    }, 2500);
  }
});
