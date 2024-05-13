import { loadStorage } from "./localStorage.mjs";

export function header() {
  const accessToken = loadStorage("accessToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function fetchAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: header(),
  });
}
