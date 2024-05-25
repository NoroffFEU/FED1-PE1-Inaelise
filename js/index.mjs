import { API_BASE_URL } from "./utils/api.mjs";
import { shortenString } from "./utils/shortenString.mjs";
import {
  renderSlideOne,
  renderSlideThree,
  renderSlideTwo,
} from "./utils/renderSlides.mjs";
import { getPosts } from "./utils/getPosts.mjs";
import { showCreateLink } from "./utils/owner.mjs";
import { greeting } from "./utils/greeting.mjs";
import { logout } from "./utils/logout.mjs";

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

const postsUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

// Render slider posts
async function renderSlider() {
  const slides = await getPosts(postsUrl);
  renderSlideOne(slides);
  renderSlideTwo(slides);
  renderSlideThree(slides);
}

renderSlider();

//Slider functions
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const postSlides = document.querySelectorAll(".slider-link");
const progress = document.querySelectorAll(".progress");
const totalSlides = postSlides.length;
let slidePosition = 0;

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

function updatePosition() {
  for (let slide of postSlides) {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  }

  postSlides[slidePosition].classList.remove("hidden");
  postSlides[slidePosition].classList.add("visible");

  for (let dot of progress) {
    dot.className = dot.className.replace("active", "");
  }
  progress[slidePosition].classList.add("active");
}

function nextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updatePosition();
}

function prevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updatePosition();
}

progress.forEach((dot, dotPosition) => {
  dot.addEventListener("click", () => {
    slidePosition = dotPosition;
    updatePosition(dotPosition);
  });
});

/* function renderPostHtml(post) {
  const displayContainer = document.getElementById("display-container");
  const blogPost = document.createElement("a");
  blogPost.href = "./post/index.html?id=" + post.id;
  blogPost.title = "Click to view article";
  blogPost.setAttribute("aria-label", "Link");
  blogPost.classList.add("article-link");

  const postImage = document.createElement("img");
  postImage.classList.add("template-img");
  postImage.src = post.media.url;

  const articleContent = document.createElement("div");
  articleContent.classList.add("article-container");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("template-title");
  postTitle.textContent = post.title;

  const postBody = document.createElement("p");
  postBody.classList.add("template-body");

  // Function to shorten the body string.
  postBody.textContent = shortenString(post.body, 90);

  displayContainer.append(blogPost);
  articleContent.append(postTitle, postBody);
  blogPost.append(postImage, articleContent);

  return blogPost;
} */

function paginate(posts, postsPerPage) {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * postsPerPage;
    const end = start + postsPerPage;
    pages.push(posts.slice(start, end));
  }
  return pages;
}

function renderPagination(paginatedPosts) {
  const pagination = document.getElementById("pagination");
  const displayContainer = document.getElementById("display-container");
  pagination.innerHTML = "";

  paginatedPosts.forEach((page, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.addEventListener("click", () => {
      displayContainer.innerHTML = "";
      renderPosts(page);
    });
    pagination.append(button);
  });
}

function renderPost(post, container) {
  const blogPost = document.createElement("a");
  blogPost.href = "./post/index.html?id=" + post.id;
  blogPost.title = "Click to view article";
  blogPost.setAttribute("aria-label", "Link");
  blogPost.classList.add("article-link");

  const postImage = document.createElement("img");
  postImage.classList.add("template-img");
  postImage.src = post.media.url;

  const articleContent = document.createElement("div");
  articleContent.classList.add("article-container");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("template-title");
  postTitle.textContent = post.title;

  const postBody = document.createElement("p");
  postBody.classList.add("template-body");

  // Function to shorten the body string.
  postBody.textContent = shortenString(post.body, 90);

  container.append(blogPost);
  articleContent.append(postTitle, postBody);
  blogPost.append(postImage, articleContent);
}

function renderPosts(posts) {
  const displayContainer = document.getElementById("display-container");
  posts.forEach((post) => renderPost(post, displayContainer));
}

// Renders list of posts
async function renderPostList() {
  const posts = await getPosts(postsUrl);
  const paginatedPosts = paginate(posts, 12);
  renderPosts(paginatedPosts[0]);
  renderPagination(paginatedPosts);
}

logout();
greeting();
renderPostList();
showCreateLink();
