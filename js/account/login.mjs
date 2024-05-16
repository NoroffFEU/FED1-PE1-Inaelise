import { API_BASE_URL } from "../utils/api.mjs";
import * as storage from "../utils/localStorage.mjs";

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

//Login form
const loginForm = {
  email: document.getElementById("email-input"),
  password: document.getElementById("password-input"),
  submit: document.getElementById("login-submit"),
};
const loginUrl = `${API_BASE_URL}auth/login`;

loginForm.submit.addEventListener("click", (e) => {
  e.preventDefault();
  loginUser(loginUrl);
});

async function loginUser(url) {
  try {
    const loginData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginForm.email.value,
        password: loginForm.password.value,
      }),
    };
    const res = await fetch(url, loginData);
    const json = await res.json();
    console.log(json);
    if (json.errors) {
      alert("Wrong Username or Password");
    } else {
      alert("You're logged in!");
      window.location.href = "../index.html";
    }
    const accessToken = json.data.accessToken;
    storage.saveToStorage("accessToken", accessToken);
    const user = json.data;
    localStorage.setItem("user", user);
    storage.saveToStorage("user", user);
  } catch (error) {
    console.log(error);
  }
}
