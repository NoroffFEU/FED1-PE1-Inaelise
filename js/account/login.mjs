import { API_BASE_URL } from "../utils/api.mjs";
import { showDropdown } from "../utils/dropdown.mjs";
import { greeting } from "../utils/greeting.mjs";
import * as storage from "../utils/localStorage.mjs";
import { logoutTwo, logoutThree } from "../utils/logout.mjs";
import { showCreateLink } from "../utils/owner.mjs";

showDropdown();
greeting();
showCreateLink();
logoutTwo();

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

function getUser() {
  const user = storage.loadStorage("user");
  const form = document.querySelector(".login-form");
  const section = document.querySelector(".bg-login");
  if (user) {
    form.classList.add("hidden-link");
    const userExist = document.createElement("h2");
    userExist.classList.add("logged-in");
    userExist.textContent = `You're already logged in as ${user.name}.`;

    const logout = document.createElement("div");
    logout.classList.add("logout-div");
    logout.innerHTML = `<p>Do you want to logout?</p><button class="logout-btn nav-link" id="page-logout" title="Click to logout">
    logout
  </button>`;
    section.append(userExist, logout);
    logoutThree();
  }
}

getUser();

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
    const userLogged = storage.loadStorage("user");
    if (json.errors) {
      alert("Wrong Username or Password");
    } else if (userLogged) {
      alert(
        "You're already logged in.. Logout first to login to different account"
      );
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
