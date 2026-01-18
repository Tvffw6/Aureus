// ================== AUTH ==================
async function register(username, password) {
  if (!username || !password) return alert("Remplis tous les champs");
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "register", username, password })
  });
  const data = await res.json();
  if (data.error) return alert(data.error);
  localStorage.setItem("user", username);
  location.href = "dashboard.html";
}

async function login(username, password) {
  if (!username || !password) return alert("Remplis tous les champs");
  const res = await fetch("/api/users");
  const data = await res.json();
  const users = data.users;
  if (!users[username] || users[username].password !== password) return alert("Nom ou mot de passe incorrect");
  localStorage.setItem("user", username);
  location.href = "dashboard.html";
}

// ================== DASHBOARD ==================
function checkAuth() { const user = localStorage.getItem("user"); if(!user) location.href="login.html"; return user; }
function logout() { localStorage.removeItem("user"); location.href="login.html"; }

async function loadDashboard() {
  const username = checkAuth();
  const res = await fetch("/api/users");
  const data = await res.json();
  const user = data.users[username];

  document.getElementById("username").textContent = username;
  document.getElementById("stars").textContent = user.stars;
  document.getElementById("status").textContent = user.status;
  document.getElementById("avatar").src = user.avatar;

  if(user.isAdmin) document.getElementById("adminPanel").style.display="block";
}

// ================== SITES ==================
async function loadSites() {
  document.getElementById("sitesSection").style.display="block";
  document.getElementById("forumSection").style.display="none";
  const res = await fetch("/api/sites");
  const data = await res.json();
  const container = document.getElementById("sitesList");
  container.innerHTML="";
  data.sites.forEach(s=>{
    container.innerHTML+=`<p>${s.name} (${s.category}) - ⭐ ${s.stars}</p>`;
  });
}

// ================== FORUM ==================
async function loadForum() {
  document.getElementById("sitesSection").style.display="none";
  document.getElementById("forumSection").style.display="block";
  const res = await fetch("/api/forum");
  const data = await res.json();
  const container = document.getElementById("forumList");
  container.innerHTML="";
  data.forum.forEach(p=>{
    container.innerHTML+=`<p>${p.user}: ${p.message}</p>`;
  });
}

// ================== ADMIN ==================
async function addSite(name, stars, category) {
  const res = await fetch("/api/sites", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({action:"add", site:{name, stars, category}})});
  if(res.ok) loadSites();
}
async function deleteSite(name) {
  const res = await fetch("/api/sites", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({action:"delete", site:{name}})});
  if(res.ok) loadSites();
}

// ================== PROFILE ==================
async function updateProfile(newAvatar,newStatus){
  const username=checkAuth();
  await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"update",username,newData:{avatar:newAvatar,status:newStatus}})});
  loadDashboard();
}
