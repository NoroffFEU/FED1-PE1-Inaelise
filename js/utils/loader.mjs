function displayLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}

export default { display: displayLoader, hide: hideLoader };
