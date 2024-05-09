import { API_BASE_URL } from "./utils/api.mjs";

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
  const res = await fetch(postsUrl);
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
  blogPost.classList.add("article-list");

  /* const postImage = document.createElement("img");
  postImage.src = post.image.url; */

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;

  displayContainer.append(blogPost);
  blogPost.append(postTitle);
}

async function renderPosts() {
  const posts = await getPosts();

  posts.forEach((post) => renderPostHtml(post));
}

renderPosts();

//Create blog posts
async function createPosts(url, userData) {
  console.log(url, userData);
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };
    const res = await fetch(url, postData);
    console.log(res);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const postContent = {
  title: "Nostalgia in Pixels",
  body: `Retro gaming, characterized by its pixelated graphics and simple gameplay mechanics, holds a special place in the hearts of gamers worldwide.

  Retro games evoke feelings of nostalgia, transporting players back to a simpler time when arcades and home consoles ruled the gaming landscape. Many players fondly recall childhood memories spent playing classics like Super Mario Bros., Pac-Man, and Tetris.

  Despite advancements in technology, retro games remain beloved for their timeless gameplay mechanics. Whether it's the addictive gameplay of platformers, the challenge of arcade classics, or the strategic depth of role-playing games, retro games offer a rewarding and immersive experience.

  Retro gaming has become a cultural phenomenon, influencing art, music, fashion, and even modern game design. Iconic characters like Mario, Sonic, and Pikachu have transcended their origins to become symbols of gaming culture and pop culture at large.

  With the rise of retro gaming platforms and collections, players can rediscover and relive their favorite classics on modern hardware. From remastered editions and emulation to dedicated retro consoles, there are countless ways to experience the magic of retro gaming today.

  Retro gaming communities thrive online, where enthusiasts share tips, memories, and fan creations. There's also a growing movement dedicated to preserving and archiving retro games, ensuring that these cultural artifacts remain accessible for future generations to enjoy.

  In summary, retro gaming offers a timeless and nostalgic experience that continues to captivate players of all ages. As new generations discover the magic of retro classics, the legacy of these beloved games lives on, reminding us of the joy and wonder of gaming's golden age.`,
  tags: ["gaming", "retro", "technology", "digital"],
  media: {
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "vintage gray game console and joystick",
  },
};

const createPostsUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

/* createPosts(createPostsUrl, postContent); */

async function deletePost(url, userData) {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };
    const res = await fetch(url, postData);
    console.log(res);
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const deletePostUrl = `${API_BASE_URL}blog/posts/OlaNordmann/0b38358f-ae79-4fce-a31d-1cbdc98cbeac`;

/* deletePost(deletePostUrl); */
