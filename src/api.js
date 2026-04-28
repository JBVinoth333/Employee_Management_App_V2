import { BASE_URL } from './config';

const DEFAULT_CONTEXT_PATH = '/EmployeeManagement';
const DEFAULT_DEV_PORT = '8085';

let activeBaseUrl = null;

function toAbsoluteUrl(baseUrl, path) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedBaseUrl = (baseUrl || '').replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

function getBaseUrlCandidates() {
  const candidates = new Set();

  if (BASE_URL) {
    candidates.add(BASE_URL);
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname, origin, port } = window.location;
    candidates.add(`${origin}${DEFAULT_CONTEXT_PATH}`);

    if ((hostname === 'localhost' || hostname === '127.0.0.1') && port !== DEFAULT_DEV_PORT) {
      candidates.add(`${protocol}//${hostname}:${DEFAULT_DEV_PORT}${DEFAULT_CONTEXT_PATH}`);
    }
  }

  return Array.from(candidates);
}

export async function apiFetch(path, options) {
  const candidates = activeBaseUrl
    ? [activeBaseUrl, ...getBaseUrlCandidates().filter((candidate) => candidate !== activeBaseUrl)]
    : getBaseUrlCandidates();

  let lastError = null;

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(toAbsoluteUrl(baseUrl, path), options);

      if (response.status === 404) {
        continue;
      }

      activeBaseUrl = baseUrl;
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to reach backend API');
}