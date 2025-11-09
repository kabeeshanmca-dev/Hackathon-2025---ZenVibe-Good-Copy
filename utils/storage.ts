
// This utility provides a safe interface to browser storage.
// It is designed to prevent the app from crashing on platforms like Vercel or
// in browsers with strict privacy settings (e.g., private mode) where
// direct access to `localStorage` is blocked.

// The check is two-fold:
// 1. It first checks if `localStorage` is even defined. This prevents a `ReferenceError`
//    in non-browser environments, like during the build process on Vercel. This was the
//    root cause of the deployment crash.
// 2. If `localStorage` is defined, it then tries to use it. This `try/catch` block
//    handles the native `DOMException` that browsers throw when storage access is
//    blocked by user settings.

export const isLocalStorageAvailable = (): boolean => {
  // First, check if localStorage exists at all. This prevents a ReferenceError
  // in server-side or build environments where the `window` object is not available.
  if (typeof localStorage === 'undefined') {
    return false;
  }
  try {
    const testKey = 'zenvibe_storage_test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    // This catch block handles the native DOMException thrown by the browser when localStorage is disabled.
    return false;
  }
};

interface AppStorage {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

let storageImplementation: AppStorage;

if (isLocalStorageAvailable()) {
  // Use localStorage, but wrap each call in a try/catch as an extra safeguard.
  // This handles edge cases like the storage quota being exceeded.
  storageImplementation = {
    get: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error(`Failed to get item '${key}' from localStorage.`, e);
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error(`Failed to set item '${key}' in localStorage.`, e);
      }
    },
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove item '${key}' from localStorage.`, e);
      }
    },
  };
} else {
  // Fallback to a simple in-memory object if localStorage is not available.
  console.warn('localStorage is not available. App state will not be persisted across page reloads.');
  const inMemoryStore: Record<string, string> = {};
  storageImplementation = {
    get: (key) => inMemoryStore[key] || null,
    set: (key, value) => { inMemoryStore[key] = value; },
    remove: (key) => { delete inMemoryStore[key]; },
  };
}

export const storage = storageImplementation;
