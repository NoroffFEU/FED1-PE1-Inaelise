import { API_BASE_URL } from "./utils/api.mjs";
import { fetchAuth } from "./utils/fetchAuth.mjs";
import { shortenString } from "./utils/shortenString.mjs";
import {
  renderSlideOne,
  renderSlideThree,
  renderSlideTwo,
} from "./utils/renderSlides.mjs";

const menuBtn = document.getElementById("menu-btn");
const dropdownMenu = document.getElementById("dropdown");

dropdownMenu.classList.remove("visible");

function toggleDropdown() {
  dropdownMenu.classList.toggle("visible");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.documentElement.addEventListener("click", (e) => {
  if (dropdownMenu.classList.contains("visible")) {
    toggleDropdown();
  }
});

const postsUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

//Display list of posts
async function getPosts() {
  const res = await fetchAuth(postsUrl);
  const json = await res.json();
  const posts = json.data;
  console.log(posts);
  if (res.ok) {
    return posts;
  }

  throw new Error(json.message);
}

// Render slider posts
async function renderSlider() {
  const slides = await getPosts();
  renderSlideOne(slides);
  renderSlideTwo(slides);
  renderSlideThree(slides);
}

renderSlider();

function renderPostHtml(post) {
  const displayContainer = document.getElementById("display-container");
  const blogPost = document.createElement("a");
  blogPost.href = "./post/index.html?id=" + post.id;
  blogPost.title = "Click to view article";
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
  postBody.textContent = shortenString(post.body, 110);

  displayContainer.append(blogPost);
  articleContent.append(postTitle, postBody);
  blogPost.append(postImage, articleContent);

  return blogPost;
}

async function renderPostList() {
  const posts = await getPosts();

  posts.forEach((post) => renderPostHtml(post));
}

renderPostList();
