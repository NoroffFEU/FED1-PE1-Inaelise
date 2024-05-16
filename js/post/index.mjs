import { API_BASE_URL } from "../utils/api.mjs";

const menuBtn = document.getElementById("menu-btn");
const dropdownMenu = document.getElementById("dropdown");

dropdownMenu.classList.remove("show");

function toggleDropdown() {
  dropdownMenu.classList.toggle("show");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.documentElement.addEventListener("click", (e) => {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});

/* function renderPostPageHtml(post) {} */

const postId = new URLSearchParams(window.location.search).get("id");
const postUrl = `${API_BASE_URL}blog/posts/OlaNordmann/${postId}`;

async function getPost() {
  const res = await fetch(postUrl);
  const json = await res.json();
  const post = json.data;
  console.log(post);
  if (res.ok) {
    return post;
  }

  throw new Error(json.message);
}

getPost();

/* async function renderPostPage() {
  const post = await getPost();
  renderPostPageHtml(post);
}

renderPostPage(); */
