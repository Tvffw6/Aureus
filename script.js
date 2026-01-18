const ADMIN = { username: "CIA", password: "Yassine76140@" };

let users = JSON.parse(localStorage.getItem("users")) || {};
let sites = JSON.parse(localStorage.getItem("sites")) || [];

// LOGIN
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

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

// REGISTER
function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (!u || !p) return alert("Champs manquants");
  if (users[u]) return alert("Utilisateur déjà existant");

  users[u] = { password: p, stars: 1 };
  localStorage.setItem("users", JSON.stringify(users));
  alert("Compte créé");
}

// LOGOUT
function logout() {
  localStorage.clear();
  location.href = "login.html";
}

// DASHBOARD
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ADMIN FUNCTIONS
function addSite() {
  sites.push({
    name: siteName.value,
    stars: Number(siteStars.value),
    url: siteUrl.value
  });
  localStorage.setItem("sites", JSON.stringify(sites));
  loadSites();
}

function setUserStars() {
  if (!users[targetUser.value]) return alert("Utilisateur introuvable");
  users[targetUser.value].stars = Number(targetStars.value);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Étoiles mises à jour");
}

// LOAD SITES
function loadSites() {
  const list = document.getElementById("sitesList");
  if (!list) return;

  list.innerHTML = "";
  const current = localStorage.getItem("currentUser");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const stars = isAdmin ? 5 : users[current]?.stars || 1;

  sites.forEach(s => {
    if (stars >= s.stars) {
      list.innerHTML += `
        <div class="card">
          <h3>${s.name}</h3>
          <p>⭐ ${s.stars}</p>
          <a href="${s.url}" target="_blank" style="color:#e10600">Accéder</a>
        </div>
      `;
    }
  });
}

// DASHBOARD SECURITY
if (location.pathname.includes("dashboard")) {
  const current = localStorage.getItem("currentUser");
  if (!current) {
    alert("Connectez-vous pour accéder au dashboard !");
    location.href = "login.html";
  }

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    document.getElementById("adminBtn").style.display = "none";
  }

  loadSites();
}
