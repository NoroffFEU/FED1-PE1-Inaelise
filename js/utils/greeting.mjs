import { loadStorage } from "./localStorage.mjs";

export function greeting() {
  const greetUser = document.querySelector(".greeting");
  const user = loadStorage("user");

  if (user) {
    greetUser.textContent = `Hello, ${user.name}!`;
    greetUser.classList.remove("hidden-link");
  }
}
