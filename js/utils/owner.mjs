import { loadStorage } from "./localStorage.mjs";

export function showCreateLink() {
  const owner = loadStorage("user");
  const createLink = document.getElementById("create-link");
  if (owner.name === "OlaNordmann") {
    createLink.classList.remove("hidden-link");
  }
}

export function showEditBtn() {
  const owner = loadStorage("user");
  const editLink = document.getElementById("owner-edit");
  if (owner.name === "OlaNordmann") {
    editLink.classList.remove("hidden-link");
  }
}
