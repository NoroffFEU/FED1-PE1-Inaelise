import { API_BASE_URL } from "../utils/api.mjs";
import { getPosts } from "../utils/getPosts.mjs";
import { shortenString } from "../utils/shortenString.mjs";
import { showCreateLink, showEditBtn } from "../utils/owner.mjs";
import { greeting } from "../utils/greeting.mjs";
import { logout } from "../utils/logout.mjs";

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
  likes.classList.add("likes");
  likes.textContent = "16 likes";

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content-div");
  const date = document.createElement("p");
  const isoDate = new Date(post.updated);
  const localeFormat = isoDate.toLocaleDateString("en-GB");
  date.textContent = `Last updated: ${localeFormat}`;
  const edit = document.createElement("a");
  edit.href = "./edit.html?id=" + post.id;
  edit.setAttribute("id", "owner-edit");
  edit.classList.add("hidden-link");
  edit.innerHTML = `<i class="fa-solid fa-pen-to-square edit-icon" title="Click to edit post" aria-label="Edit"></i>`;

  const postTitle = document.createElement("h1");
  postTitle.textContent = post.title;
  postTitle.classList.add("post-title");

  const postBody = document.createElement("p");
  postBody.textContent = post.body;
  postBody.classList.add("post-body");

  contentDiv.append(date, edit);
  contentInfo.append(author, likes);
  content.append(postTitle, postBody);
  info.append(authorImg, contentInfo, contentDiv);
  article.append(image, info, content);
}

const postId = new URLSearchParams(window.location.search).get("id");
const postUrl = `${API_BASE_URL}blog/posts/OlaNordmann/${postId}`;
const postsUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

async function renderFeaturedPosts() {
  const posts = await getPosts(postsUrl);
  const featured = document.querySelector(".featured-posts");

  const postOne = document.createElement("a");
  const firstPost = posts[0];
  postOne.href = "../post/index.html?id=" + firstPost.id;
  postOne.title = "Click to view article";
  postOne.setAttribute("aria-label", "Link");
  postOne.classList.add("slide");
  postOne.innerHTML = `
    <img class="slide-img" src="${firstPost.media.url}" />
    <div class="slider-content">
      <h3 class="slide-title">${firstPost.title}</h3>
      <p class="slide-body">${shortenString(firstPost.body, 50)}</p>
      <div class="read-more-container read">
        <p class="read-more">read more</p>
        <i class="fa-solid fa-arrow-right-long read-arrow"></i>
      </div>
    </div>`;

  const postTwo = document.createElement("a");
  const secondPost = posts[1];
  postTwo.href = "../post/index.html?id=" + secondPost.id;
  postTwo.title = "Click to view article";
  postTwo.setAttribute("aria-label", "Link");
  postTwo.classList.add("slide");
  postTwo.innerHTML = `
      <img class="slide-img" src="${secondPost.media.url}" />
      <div class="slider-content">
        <h3 class="slide-title">${secondPost.title}</h3>
        <p class="slide-body">${shortenString(secondPost.body, 50)}</p>
        <div class="read-more-container read">
          <p class="read-more">read more</p>
          <i class="fa-solid fa-arrow-right-long read-arrow"></i>
        </div>
      </div>`;

  const postThree = document.createElement("a");
  const thirdPost = posts[2];
  postThree.href = "../post/index.html?id=" + thirdPost.id;
  postThree.title = "Click to view article";
  postThree.setAttribute("aria-label", "Link");
  postThree.classList.add("slide");
  postThree.innerHTML = `
      <img class="slide-img" src="${thirdPost.media.url}" />
      <div class="slider-content">
        <h3 class="slide-title">${thirdPost.title}</h3>
        <p class="slide-body">${shortenString(thirdPost.body, 50)}</p>
        <div class="read-more-container read">
          <p class="read-more">read more</p>
          <i class="fa-solid fa-arrow-right-long read-arrow"></i>
        </div>
      </div>`;

  featured.append(postOne, postTwo, postThree);
}

renderFeaturedPosts();

async function renderPostPage() {
  const post = await getPosts(postUrl);
  renderPostPageHtml(post);
  showCreateLink();
  showEditBtn();
  greeting();
  logout();
}

renderPostPage();
