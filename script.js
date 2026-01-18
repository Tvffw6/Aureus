const ADMIN = {
  username: "CIA",
  password: "Yassine76140@"
};

let users = JSON.parse(localStorage.getItem("users")) || {};
let sites = JSON.parse(localStorage.getItem("sites")) || [];

function login() {
  const u = username.value;
  const p = password.value;

  if (u === ADMIN.username && p === ADMIN.password) {
    localStorage.setItem("currentUser", u);
    localStorage.setItem("isAdmin", "true");
    location.href = "dashboard.html";
    return;
  }

  if (!users[u] || users[u].password !== p) {
    alert("Login incorrect");
    return;
  }

  localStorage.setItem("currentUser", u);
  localStorage.setItem("isAdmin", "false");
  location.href = "dashboard.html";
}

function register() {
  if (users[username.value]) return alert("User existe déjà");

  users[username.value] = {
    password: password.value,
    stars: 1
  };

  localStorage.setItem("users", JSON.stringify(users));
  alert("Compte créé");
}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}

function show(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function addSite() {
  sites.push({
    name: siteName.value,
    stars: parseInt(siteStars.value),
    url: siteUrl.value
  });

  localStorage.setItem("sites", JSON.stringify(sites));
  loadSites();
}

function loadSites() {
  const container = document.getElementById("sitesList");
  container.innerHTML = "";

  const current = localStorage.getItem("currentUser");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const starLevel = isAdmin ? 5 : users[current]?.stars || 1;

  sites.forEach(s => {
    if (starLevel >= s.stars) {
      container.innerHTML += `
        <div class="card">
          <h3>${s.name}</h3>
          <p>⭐ ${s.stars}</p>
          <a href="${s.url}" target="_blank">Accéder</a>
        </div>
      `;
    }
  });
}

function setUserStars() {
  if (!users[targetUser.value]) return alert("User introuvable");
  users[targetUser.value].stars = parseInt(targetStars.value);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Étoiles mises à jour");
}

if (location.pathname.includes("dashboard")) {
  loadSites();
}
