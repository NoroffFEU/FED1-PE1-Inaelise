import { API_BASE_URL } from "./utils/api.mjs";

//Dropdown menu
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
    }
    const accessToken = json.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    const user = json.data.name;
    localStorage.setItem("user", user);
  } catch (error) {
    console.log(error);
  }
}
