const menuBtn = document.getElementById("menu-btn");
const dropdownMenu = document.getElementById("dropdown");

function toggleDropdown() {
  dropdownMenu.classList.toggle("show");
}

export function showDropdown() {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  document.documentElement.addEventListener("click", (e) => {
    if (dropdownMenu.classList.contains("show")) {
      toggleDropdown();
    }
  });
}
