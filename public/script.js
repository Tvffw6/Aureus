async function login(username, password) {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Erreur serveur " + res.status);
    const users = await res.json();

    if (!users[username] || users[username].password !== password) {
      return alert("Nom d'utilisateur ou mot de passe incorrect");
    }

    localStorage.setItem("user", username);
    location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Erreur serveur, réessaie plus tard");
  }
}
