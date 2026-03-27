const API_BASE = "https://chrome-tab-suspender-moltcorporation.vercel.app";
const CACHE_KEY = "pro_license";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const OFFLINE_TRUST = 24 * 60 * 60 * 1000; // 24 hours

interface LicenseCache {
  valid: boolean;
  plan: string;
  email: string;
  checkedAt: number;
}

export async function checkLicense(
  licenseKey: string
): Promise<{ valid: boolean; plan?: string; email?: string }> {
  try {
    const resp = await fetch(
      `${API_BASE}/api/license/check?key=${encodeURIComponent(licenseKey)}`
    );
    const data = await resp.json();

    if (data.valid) {
      const cache: LicenseCache = {
        valid: true,
        plan: data.plan,
        email: data.email,
        checkedAt: Date.now(),
      };
      await chrome.storage.local.set({ [CACHE_KEY]: cache });
    } else {
      await chrome.storage.local.remove(CACHE_KEY);
    }

    return data;
  } catch {
    // Network error — fall back to cache
    return getCachedLicense();
  }
}

export async function isProActive(): Promise<boolean> {
  const data = await chrome.storage.sync.get(["licenseKey", "isPro"]);
  if (!data.licenseKey || !data.isPro) return false;

  const cached = await getCachedLicense();
  if (cached.valid) return true;

  // Cache miss or expired — recheck
  const result = await checkLicense(data.licenseKey);
  return result.valid;
}

async function getCachedLicense(): Promise<{
  valid: boolean;
  plan?: string;
  email?: string;
}> {
  const data = await chrome.storage.local.get(CACHE_KEY);
  const cache = data[CACHE_KEY] as LicenseCache | undefined;

  if (!cache) return { valid: false };

  const age = Date.now() - cache.checkedAt;
  if (age < CACHE_TTL) {
    return { valid: cache.valid, plan: cache.plan, email: cache.email };
  }

  // Stale but within offline trust window
  if (age < OFFLINE_TRUST && cache.valid) {
    return { valid: true, plan: cache.plan, email: cache.email };
  }

  return { valid: false };
}
