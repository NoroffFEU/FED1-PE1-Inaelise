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

function renderPostPageHtml(post) {
  const article = document.querySelector(".post-container");
  const info = document.querySelector(".article-info");
  const content = document.querySelector(".article-content");

  const image = document.createElement("img");
  image.src = post.media.url;
  image.alt = post.media.alt;
  image.classList.add("post-img");

  const authorImg = document.createElement("img");
  authorImg.src = post.author.avatar.url;
  authorImg.alt = post.author.avatar.alt;
  authorImg.classList.add("author-img");

  const contentInfo = document.createElement("div");
  contentInfo.classList.add("content-info");
  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = post.author.name;
  const likes = document.createElement("p");
  likes.textContent = "16 likes";
  const comments = document.createElement("p");
  comments.textContent = "4 comments";

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-div");
  const date = document.createElement("p");
  const isoDate = new Date(post.updated);
  const localeFormat = isoDate.toLocaleDateString("en-GB");
  date.textContent = `Last updated: ${localeFormat}`;

  contentDiv.append(date);
  contentInfo.append(author, likes, comments);
  content.append(contentInfo, contentDiv);
  info.append(authorImg);
  article.append(image, info, content);
}

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

async function renderPostPage() {
  const post = await getPost();
  renderPostPageHtml(post);
}

renderPostPage();
