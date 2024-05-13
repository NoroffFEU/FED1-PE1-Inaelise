import { API_BASE_URL } from "./utils/api.mjs";
import { fetchAuth } from "./utils/fetchAuth.mjs";

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

//Access token and gets blog posts function
/* async function displayPosts(url) {
  try {
    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, getOptions);
    console.log(res);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
} */

/* function renderPostHtml(post) {
  const blogPost = document.createElement("a");
  blogPost.href = "./post/index.html?id=" + post.id;
  blogPost.title = "Click to view article";
  blogPost.classList.add("article-list");

  const postImage = document.createElement("img");
  postImage.src = post.image.url;

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;

  blogPost.append(postImage, postTitle);

  return blogPost;
}
 */
/* function displayPosts(posts) {
  const displayContainer = document.getElementById("display-container");
  displayContainer.textContent = "";

  posts.forEach((post) => {
    const postHtml = renderPostHtml(post);
    displayContainer.appendChild(postHtml);
  });
}

async function renderPage() {
  try {
    const res = await fetch(postsUrl);
    const json = await res.json();
    const posts = json.data;
    console.log(posts);
    displayPosts(posts);
  } catch (error) {
    alert("Error fetching posts", error);
  }
} */

/* renderPage(); */

const postsUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

async function getPosts() {
  const res = await fetchAuth(postsUrl);
  const json = await res.json();
  const posts = json.data;
  console.log(posts);

  return posts;
}

function renderPostHtml(post) {
  const displayContainer = document.getElementById("display-container");
  const blogPost = document.createElement("a");
  blogPost.href = "./post/index.html?id=" + post.id;
  blogPost.title = "Click to view article";
  blogPost.classList.add("article-link");

  const postImage = document.createElement("img");
  postImage.classList.add("template-img");
  postImage.src = post.media.url;

  const postTitle = document.createElement("h3");
  postTitle.classList.add("template-title");
  postTitle.textContent = post.title;

  const postBody = document.createElement("p");
  postBody.classList.add("template-body");

  // Function to shorten the body string.
  function shortenBody(str, max) {
    const shorten = str.indexOf(" ", max);
    if (shorten === -1) {
      return str;
    }
    return str.substring(0, shorten) + "...";
  }

  postBody.textContent = shortenBody(post.body, 110);

  displayContainer.append(blogPost);
  blogPost.append(postTitle, postImage, postBody);

  return blogPost;
}

async function renderPosts() {
  const posts = await getPosts();

  posts.forEach((post) => renderPostHtml(post));
}

renderPosts();
