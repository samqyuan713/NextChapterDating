import { Capacitor } from '@capacitor/core';

export const PRIMARY_DEV_SERVER_URL = "https://ais-dev-j4os3vmz2eepnq6k2ymqpv-469255650912.asia-southeast1.run.app";
export const SHARED_PREVIEW_SERVER_URL = "https://ais-pre-j4os3vmz2eepnq6k2ymqpv-469255650912.asia-southeast1.run.app";

/**
 * Gets the active server base URL stored in localStorage or default
 */
export function getActiveServerBaseUrl(): string {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem("app_active_server_url");
    if (saved && saved.trim() !== '') {
      return saved.trim();
    }
  }
  return Capacitor.isNativePlatform() ? SHARED_PREVIEW_SERVER_URL : PRIMARY_DEV_SERVER_URL;
}

/**
 * Sets the active server base URL in localStorage
 */
export function setActiveServerBaseUrl(url: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem("app_active_server_url", url.trim());
  }
}

/**
 * Returns a fully qualified API endpoint URL.
 * Supports absolute base override or active configured server URL for cross-environment sync.
 */
export function getApiUrl(path: string, overrideBase?: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (overrideBase) {
    return `${overrideBase.replace(/\/+$/, '')}${cleanPath}`;
  }

  // Check user-configured override from local settings
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem("app_active_server_url");
    if (saved && saved.trim() !== '') {
      return `${saved.trim().replace(/\/+$/, '')}${cleanPath}`;
    }
  }

  if (Capacitor.isNativePlatform()) {
    const customUrl = (import.meta as any).env?.VITE_SERVER_URL;
    // On native mobile APKs, default to the public SHARED_PREVIEW_SERVER_URL
    const baseUrl = customUrl && customUrl.trim() !== '' ? customUrl.trim() : SHARED_PREVIEW_SERVER_URL;
    const cleanBase = baseUrl.replace(/\/+$/, '');
    return `${cleanBase}${cleanPath}`;
  }
  
  return cleanPath;
}

/**
 * Checks server connectivity and latency for diagnostic panel
 */
export async function checkServerHealth(targetUrl?: string): Promise<{
  reachable: boolean;
  status: number;
  message: string;
  url: string;
  latencyMs: number;
}> {
  const base = targetUrl || getActiveServerBaseUrl();
  const testEndpoint = `${base.replace(/\/+$/, '')}/api/health`;
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(testEndpoint, {
      method: "GET",
      signal: controller.signal,
      headers: { "Accept": "application/json" }
    });
    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        reachable: true,
        status: res.status,
        message: `Connected successfully (${latencyMs}ms). Service: ${data.service || "active"}`,
        url: testEndpoint,
        latencyMs
      };
    } else if (res.status === 404) {
      return {
        reachable: false,
        status: 404,
        message: `Server returned 404 Not Found. This endpoint is not active or the container is not running on Cloud Run.`,
        url: testEndpoint,
        latencyMs
      };
    } else if (res.status === 302) {
      return {
        reachable: false,
        status: 302,
        message: `Server requires Google AI Studio authentication cookies (ais-dev). Deploy/share the app to use the public preview.`,
        url: testEndpoint,
        latencyMs
      };
    } else {
      return {
        reachable: false,
        status: res.status,
        message: `HTTP ${res.status} response from server.`,
        url: testEndpoint,
        latencyMs
      };
    }
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return {
      reachable: false,
      status: 0,
      message: err.name === 'AbortError' ? 'Connection timed out after 6 seconds.' : (err.message || 'Network connection failed.'),
      url: testEndpoint,
      latencyMs
    };
  }
}

/**
 * Wrapper for fetch that automatically handles API routing across Web and Mobile Native (Capacitor)
 * with automatic fallback if primary server is unreachable.
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = getApiUrl(path);
  try {
    const res = await fetch(url, options);
    // If the response is 404 or 502/503 on native mobile, attempt fallback if alternative available
    if (Capacitor.isNativePlatform() && (res.status === 404 || res.status === 502 || res.status === 503)) {
      const fallbackBase = url.includes(SHARED_PREVIEW_SERVER_URL) ? PRIMARY_DEV_SERVER_URL : SHARED_PREVIEW_SERVER_URL;
      const fallbackUrl = getApiUrl(path, fallbackBase);
      try {
        const fallbackRes = await fetch(fallbackUrl, options);
        if (fallbackRes && fallbackRes.ok) {
          return fallbackRes;
        }
      } catch {
        // preserve original response
      }
    }
    return res;
  } catch (err) {
    if (Capacitor.isNativePlatform()) {
      const fallbackBase = url.includes(SHARED_PREVIEW_SERVER_URL) ? PRIMARY_DEV_SERVER_URL : SHARED_PREVIEW_SERVER_URL;
      const fallbackUrl = getApiUrl(path, fallbackBase);
      console.warn(`[apiFetch] Primary fetch failed for ${url}, trying fallback ${fallbackUrl}...`);
      return fetch(fallbackUrl, options);
    }
    throw err;
  }
}

/**
 * Safely fetches an API endpoint and parses JSON without throwing SyntaxError or NetworkError.
 * Returns { ok: boolean, status: number, data: T | null, error?: string }
 */
export async function safeJsonFetch<T = any>(
  path: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  try {
    const res = await apiFetch(path, options);
    const contentType = res.headers.get("content-type") || "";

    let data: any = null;
    if (contentType.includes("application/json")) {
      try {
        data = await res.json();
      } catch (jsonErr: any) {
        return {
          ok: false,
          status: res.status,
          data: null,
          error: "Invalid JSON response from server"
        };
      }
    } else {
      const text = await res.text().catch(() => "");
      let specificError = `Server HTTP ${res.status}`;
      if (res.status === 404) {
        specificError = "Server HTTP 404: Container endpoint not found. Ensure backend is deployed on Cloud Run.";
      } else if (text.includes("__cookie_check")) {
        specificError = "Server HTTP 302: Protected by Google auth cookie. Deploy to Shared Preview or use public host.";
      }
      return {
        ok: false,
        status: res.status,
        data: null,
        error: specificError
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data?.error || data?.message || `HTTP ${res.status} error`
      };
    }

    return {
      ok: true,
      status: res.status,
      data
    };
  } catch (netErr: any) {
    console.warn(`[safeJsonFetch] Network/fetch error for [${path}]:`, netErr);
    return {
      ok: false,
      status: 0,
      data: null,
      error: netErr?.message || "Network connection error: Failed to connect to backend server"
    };
  }
}

