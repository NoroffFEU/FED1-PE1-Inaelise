import { loadStorage, removeFromStorage } from "./localStorage.mjs";

export function logoutOne() {
  const user = loadStorage("user");
  const button = document.querySelector(".logout-btn");
  const container = document.querySelector(".logout");

  if (user) {
    container.classList.remove("hidden-link");
  }
  button.addEventListener("click", () => {
    if (window.confirm("Are you sure you want to logout?") === true) {
      removeFromStorage("user");
      removeFromStorage("accessToken");
      alert("You've logged out!");
      window.location.href = "./index.html";
    }
  });
}

export function logoutTwo() {
  const user = loadStorage("user");
  const button = document.querySelector(".logout-btn");
  const container = document.querySelector(".logout");

  if (user) {
    container.classList.remove("hidden-link");
  }
  button.addEventListener("click", () => {
    if (window.confirm("Are you sure you want to logout?") === true) {
      removeFromStorage("user");
      removeFromStorage("accessToken");
      alert("You've logged out!");
      window.location.href = "../index.html";
    }
  });
}
