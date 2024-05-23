import { API_BASE_URL } from "../utils/api.mjs";
import { header } from "../utils/fetchAuth.mjs";
import { getPosts } from "../utils/getPosts.mjs";
import { showCreateLink } from "../utils/owner.mjs";

//Dropdown menu
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

showCreateLink();

//Edit form
const editForm = {
  title: document.getElementById("title-input"),
  image: document.getElementById("url-input"),
  imageAlt: document.getElementById("alt-input"),
  tags: document.getElementById("tag-input"),
  body: document.getElementById("content-input"),
  submit: document.querySelector(".save-btn"),
  delete: document.querySelector(".delete-btn"),
};

const postId = new URLSearchParams(window.location.search).get("id");
const updatePostUrl = `${API_BASE_URL}blog/posts/OlaNordmann/${postId}`;

async function setUpdateListener() {
  if (editForm) {
    const post = await getPosts(updatePostUrl);

    editForm.title.value = post.title;
    editForm.image.value = post.media.url;
    editForm.imageAlt.value = post.media.alt;
    editForm.tags.value = post.tags;
    editForm.body.value = post.body;
  }
}

setUpdateListener();

editForm.submit.addEventListener("click", (e) => {
  e.preventDefault();
  updatePost(updatePostUrl);
});

async function updatePost(url) {
  try {
    const data = {
      method: "PUT",
      headers: header(),
      body: JSON.stringify({
        title: editForm.title.value,
        media: {
          url: editForm.image.value,
          alt: editForm.imageAlt.value,
        },
        tags: editForm.tags.value.split(","),
        body: editForm.body.value,
      }),
    };
    const res = await fetch(url, data);
    const json = await res.json();
    console.log(json);
    if (json.errors) {
      const obj = json.errors;
      for (let i = 0; i < obj.length; i++) alert(obj[i].message);
    } else {
      alert("Article was updated!");
      window.location.href = `../post/index.html?id=${postId}`;
    }
  } catch (error) {
    alert("Something went wrong...", error);
  }
}

editForm.delete.addEventListener("click", (e) => {
  e.preventDefault();
  deletePost(updatePostUrl);
});

async function deletePost(url) {
  try {
    const data = {
      method: "DELETE",
      headers: header(),
    };
    const res = await fetch(url, data);
    const json = res.json();
    if (json.errors) {
      const obj = json.errors;
      for (let i = 0; i < obj.length; i++) alert(obj[i].message);
    } else {
      alert("Post was deleted!");
      window.location.href = "../index.html";
    }
  } catch (error) {
    alert("Something went wrong...", error);
  }
}
