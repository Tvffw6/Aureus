let mode = "login";

function showLogin() {
  mode = "login";
  authTitle.innerText = "Login";
}

function showRegister() {
  mode = "register";
  authTitle.innerText = "Register";
}

function submitAuth() {
  const user = username.value;
  const pass = password.value;

  if (!user || !pass) return alert("Champs manquants");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (mode === "register") {
    users[user] = { password: pass, stars: 1 };
    localStorage.setItem("users", JSON.stringify(users));
  }

  if (!users[user] || users[user].password !== pass) {
    return alert("Erreur login");
  }

  localStorage.setItem("currentUser", user);
  location.href = "dashboard.html";
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

function updateProfile() {
  let users = JSON.parse(localStorage.getItem("users"));
  let current = localStorage.getItem("currentUser");

  if (newUsername.value) {
    users[newUsername.value] = users[current];
    delete users[current];
    localStorage.setItem("currentUser", newUsername.value);
  }

  if (newPassword.value) {
    users[current].password = newPassword.value;
  }

  localStorage.setItem("users", JSON.stringify(users));
  alert("Profil mis à jour");
}

function loadSites() {
  let user = localStorage.getItem("currentUser");
  let users = JSON.parse(localStorage.getItem("users"));
  let stars = users[user].stars;

  let sites = [
    { name: "Site 1", stars: 1 },
    { name: "Site 3", stars: 3 },
    { name: "Site 5", stars: 5 }
  ];

  let container = document.getElementById("sitesList");
  container.innerHTML = "";

  sites.forEach(s => {
    if (stars >= s.stars) {
      container.innerHTML += `<p>⭐ ${s.name}</p>`;
    }
  });
}

if (location.pathname.includes("dashboard")) {
  loadSites();
}
