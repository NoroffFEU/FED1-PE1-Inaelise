import { API_BASE_URL } from "../utils/api.mjs";
import { greeting } from "../utils/greeting.mjs";

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

greeting();

//Register form
const registerForm = {
  username: document.getElementById("username-input"),
  avatar: document.getElementById("avatar-input"),
  email: document.getElementById("email-input"),
  password: document.getElementById("password-input"),
  submit: document.getElementById("register-btn"),
};

const registerUrl = `${API_BASE_URL}auth/register`;

registerForm.submit.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser(registerUrl);
});

async function registerUser(url) {
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registerForm.username.value,
        avatar: {
          url: registerForm.avatar.value,
        },
        email: registerForm.email.value,
        password: registerForm.password.value,
      }),
    };
    const res = await fetch(url, data);
    console.log(res);
    const json = await res.json();
    console.log(json);
    if (json.errors) {
      const obj = json.errors;
      for (let i = 0; i < obj.length; i++) alert(obj[i].message);
    } else {
      alert("Thank you for registering!");
    }
  } catch (error) {
    alert("Error registering", error);
  }
}
