const routes = {
  "/": "./views/users.html",
  "/users": "./views/users.html",
  "/newuser": "./views/newuser.html",
  "/about": "./views/about.html",
  "/login": "./views/login.html",
};

let counter = 0;

function isAuth() {
  const result = localStorage.getItem("Auth") || null;
  const resultBool = result === 'true'
  return resultBool;
}

async function navigate(pathname) {
  if (!isAuth()) {
    pathname = "/login";
  }

  const route = routes[pathname] || routes["/"];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

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

function setupCounter() {
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

window.addEventListener("popstate", () => {
  console.log("se hizo clic");
  console.log(location);
  navigate(location.pathname);
});

function setupLoginForm() {
  const userAuth = "admin";
  const passAuth = "1234";

  const form = document.getElementById("login-spa");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const pass = document.getElementById("password").value;

    if (user === userAuth && pass === passAuth) {
      localStorage.setItem("Auth", "true");
      navigate("/users");
    } else {
      alert("usuario o contraseña son incorrectos");
    }
  });
}

const buttonCloseSession = document.getElementById("close-sesion");
buttonCloseSession.addEventListener("click", () => {
  localStorage.setItem("Auth", "false");
  navigate("/login");
});


window.addEventListener("DOMContentLoaded", () => {
  navigate(location.pathname);
});
