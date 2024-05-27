import { greeting } from "./utils/greeting.mjs";
import { logout } from "./utils/logout.mjs";
import { showDropdown } from "./utils/dropdown.mjs";
import { showCreateLink } from "./utils/owner.mjs";

const singupBtn = document.querySelector(".signup-btn");
singupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "./account/register.html";
});

showCreateLink();
showDropdown();
greeting();
logout();
