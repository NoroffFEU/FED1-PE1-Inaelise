const menuBtn = document.getElementById("menu-btn");
const dropdownMenu = document.getElementById("dropdown");

function toggleDropdown() {
  dropdownMenu.classList.toggle("visible");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.documentElement.addEventListener("click", () => {
  if (dropdownMenu.classList.contains("visible")) {
    toggleDropdown();
  }
});
