// Session
function login(username,password){
    fetch("/api/users")
    .then(res=>res.json())
    .then(users=>{
        if(users[username] && users[username].password===password){
            sessionStorage.setItem("currentUser",username);
            location.href="dashboard.html";
        } else alert("Utilisateur ou mot de passe incorrect");
    });
}

async function register(username,password){
    if(!username||!password) return alert("Remplis tous les champs");
    const res = await fetch("/api/users",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    });
    const data = await res.json();
    if(data.success){
        alert("Compte créé !");
        sessionStorage.setItem("currentUser",username);
        location.href="dashboard.html";
    } else alert(data.error || "Erreur inscription");
}

function logout(){
    sessionStorage.removeItem("currentUser");
    location.href="login.html";
}

function getCurrentUser(){ return sessionStorage.getItem("currentUser"); }

// Dashboard
async function loadDashboard(){
    const username = getCurrentUser();
    if(!username) return location.href="login.html";

    const usersRes = await fetch("/api/users");
    const users = await usersRes.json();
    const currentUser = users[username];

    if(currentUser.isAdmin) document.getElementById("adminPanel").style.display="block";
    else document.getElementById("adminPanel").style.display="none";

    document.getElementById("profileName").innerText=username;
    document.getElementById("profileStars").innerText=currentUser.stars;

    loadSites();
    loadForum();
    loadRanking(users);
}

// Sites
async function loadSites(){
    const res = await fetch("/api/sites");
    const sites = await res.json();
    const container = document.getElementById("sitesContainer");
    container.innerHTML="";
    sites.forEach((site,i)=>{
        const div = document.createElement("div");
        div.className="site";
        div.innerHTML=`<h3>${site.name} (${site.stars}⭐)</h3>
                       <a href="${site.url}" target="_blank">${site.url}</a>`;
        container.appendChild(div);
    });
}

async function addSite(site){
    await fetch("/api/sites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(site)});
    loadSites();
}

function promptAddSite(){
    const name = prompt("Nom du site ?");
    const url = prompt("Lien du site ?");
    const stars = parseInt(prompt("Étoiles requises (1-5) ?"));
    const category = prompt("Catégorie (Jeux / Proxy / Jeux + Proxy) ?");
    if(!name||!url||!stars||!category) return alert("Champs manquants !");
    addSite({name,url,stars,category});
}

// Forum
async function loadForum(){
    const res = await fetch("/api/forum");
    const messages = await res.json();
    const container = document.getElementById("forumContainer");
    container.innerHTML="";
    messages.forEach(msg=>{
        const div = document.createElement("div");
        div.innerHTML=`<strong>${msg.user}</strong>: ${msg.text}`;
        container.appendChild(div);
    });
}

async function postForum(text){
    const user = getCurrentUser();
    if(!text) return;
    await fetch("/api/forum",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user,text})});
    loadForum();
}

// Ranking
function loadRanking(users){
    if(!document.getElementById("rankingContainer")) return;
    const container = document.getElementById("rankingContainer");
    container.innerHTML="";
    const sorted = Object.entries(users).sort((a,b)=>b[1].stars-a[1].stars);
    sorted.forEach(([username,data])=>{
        const div = document.createElement("div");
        div.innerText=`${username}: ${data.stars}⭐`;
        container.appendChild(div);
    });
}
