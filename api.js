// Every call to the FastAPI backend goes through this file.
// The backend address comes from the VITE_API_BASE_URL environment variable (see .env.example).
import { useEffect, useState } from "react";

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8001").replace(/\/$/, "");

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") q.append(key, value);
  });
  const text = q.toString();
  return text ? "?" + text : "";
}

async function request(method, path, { params, body, form } = {}) {
  let res;
  try {
    res = await fetch(API_BASE + path + toQuery(params), {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: form || (body ? JSON.stringify(body) : undefined),
    });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_BASE}. Check that it is running and that VITE_API_BASE_URL is correct.`);
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* the response had no JSON body */
  }
  if (!res.ok) {
    const detail = data && data.detail;
    const message =
      typeof detail === "string" ? detail
      : Array.isArray(detail) ? detail.map((d) => d.msg).join("; ")
      : `Request failed (HTTP ${res.status}).`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  get: (path, params) => request("GET", path, { params }),
  post: (path, body, params) => request("POST", path, { body, params }),
  put: (path, body) => request("PUT", path, { body }),
  patch: (path, body) => request("PATCH", path, { body }),
  del: (path) => request("DELETE", path),
  upload: (path, form) => request("POST", path, { form }),
};

// Turns a backend link into a full address (local-mode files use a relative link).
export function fullUrl(url) {
  return url && url.startsWith("/") ? API_BASE + url : url;
}

// React hook: loads data when the page opens and again whenever path/params change.
// Pass path = null to skip loading. refreshMs > 0 reloads automatically.
export function useFetch(path, params = {}, refreshMs = 0, extraKey = 0) {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [tick, setTick] = useState(0);
  const key = JSON.stringify(params);

  useEffect(() => {
    if (!path) {
      setState({ data: null, error: "", loading: false });
      return undefined;
    }
    let cancelled = false;
    const run = () =>
      api.get(path, params).then(
        (data) => !cancelled && setState({ data, error: "", loading: false }),
        (err) => !cancelled && setState((s) => ({ ...s, error: err.message, loading: false }))
      );
    setState((s) => ({ ...s, loading: true }));
    run();
    const timer = refreshMs ? setInterval(run, refreshMs) : null;
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, key, refreshMs, extraKey, tick]);

  return { ...state, reload: () => setTick((t) => t + 1) };
}
