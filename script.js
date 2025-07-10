import { getUsers } from "./services";

// routes
const routes = {
  "/users": "./views/users.html",
  "/newuser": "./views/newuser.html",
  "/about": "./views/about.html",
  "/login": "./views/login.html",
};

function isAuth() {
  const result = localStorage.getItem("Auth") || null;
  const resultBool = result === "true";
  return resultBool;
}

async function navigate(pathname) {
  if (!isAuth()) {
    pathname = "/login";
  }
  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

  if (pathname === "/users") setupUsers();
  if (pathname === "/about") setupCounter();
  if (pathname === "/login") setupLoginForm();
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

function setupUsers() {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";

  document.querySelectorAll(".admin-btn").forEach((button) => {
    button.style.display = isAdmin ? "" : "none";
  });
}

function setupCounter() {
  let counter = 0;

  const counterValue = document.getElementById("counter-value");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");

  incrementBtn?.addEventListener("click", () => {
    counter++;
    counterValue.textContent = counter;
  });

  decrementBtn?.addEventListener("click", () => {
    counter--;
    counterValue.textContent = counter;
  });
}


// login
function setupLoginForm() {
  const form = document.getElementById("login-spa");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;

    const users = await getUsers();

    // Buscar usuario que coincida
    const foundUser = users.find(
      (u) => u.user === user && String(u.password) === pass
    );

    if (foundUser) {
      localStorage.setItem("Auth", "true");
      localStorage.setItem("role", foundUser.role);
      navigate("/users");
    } else {
      alert("usuario o contraseña son incorrectos");
    }
  });
}

// logout
const buttonCloseSession = document.getElementById("close-sesion");
buttonCloseSession.addEventListener("click", () => {
  localStorage.setItem("Auth", "false");
  localStorage.removeItem("role");
  navigate("/login");
});


window.addEventListener("DOMContentLoaded", () => {
  navigate(location.pathname);
});

window.addEventListener("popstate", () => {
  console.log("se hizo clic");
  console.log(location);
  navigate(location.pathname);
});
