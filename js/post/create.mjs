import { header } from "../utils/fetchAuth.mjs";
import { API_BASE_URL } from "../utils/api.mjs";
import { greeting } from "../utils/greeting.mjs";
import { logoutTwo } from "../utils/logout.mjs";
import { showDropdown } from "../utils/dropdown.mjs";

showDropdown();
greeting();
logoutTwo();

// Create form
const createForm = {
  title: document.getElementById("create-title"),
  image: document.getElementById("create-url"),
  imageAlt: document.getElementById("create-alt"),
  tags: document.getElementById("create-tag"),
  body: document.getElementById("create-content"),
  submit: document.querySelector(".create-btn"),
};

const createPostUrl = `${API_BASE_URL}blog/posts/OlaNordmann`;

//Create blog posts
async function createPost(url) {
  try {
    const data = {
      method: "POST",
      headers: header(),
      body: JSON.stringify({
        title: createForm.title.value,
        media: {
          url: createForm.image.value,
          alt: createForm.imageAlt.value,
        },
        tags: createForm.tags.value.split(","),
        body: createForm.body.value,
      }),
    };
    const res = await fetch(url, data);
    const json = await res.json();
    if (json.errors) {
      const obj = json.errors;
      for (let i = 0; i < obj.length; i++) alert(obj[i].message);
    } else {
      alert("Article was created!");
      window.location.href = "../index.html";
    }
  } catch (error) {
    alert("Something went wrong...", error);
  }
}

createForm.submit.addEventListener("click", (e) => {
  e.preventDefault();
  createPost(createPostUrl);
});
