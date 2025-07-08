const routes = {
  "/": "./views/users.html",
  "/users": "./views/users.html",
  "/newuser": "./views/newuser.html",
  "/about": "./views/about.html",
};

let counter = 0;

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

async function navigate(pathname) {
  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

  const counterValue = document.getElementById("counter-value");
  const incrementBtn = document.getElementById("increment-btn");
  const decrementBtn = document.getElementById("decrement-btn");

  incrementBtn.addEventListener("click", () => {
    counter++;
    counterValue.textContent = counter;
  });
  decrementBtn.addEventListener("click", () => {
    counter--;
    counterValue.textContent = counter;
  });
}

window.addEventListener("popstate", () => {
  console.log("se hizo clic");
  console.log(location);
  navigate(location.pathname);
});
