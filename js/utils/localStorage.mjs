export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadStorage(key) {
  try {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue);
  } catch (error) {
    return null;
  }
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}
