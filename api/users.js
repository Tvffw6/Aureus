import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const dataFile = path.join(process.cwd(), "data.json");

  let data = {};
  try {
    data = JSON.parse(await fs.readFile(dataFile, "utf-8"));
  } catch (err) {
    console.error("Erreur lecture data.json:", err);
    return res.status(500).json({ error: "Impossible de lire data.json" });
  }

  if (req.method === "GET") {
    return res.status(200).json(data.users);
  }

  if (req.method === "POST") {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Remplis tous les champs" });
    if (data.users[username]) return res.status(400).json({ error: "Utilisateur déjà existant" });

    data.users[username] = { password, stars: 1, isAdmin: false, avatar: "images/default.png", status: "🟢 Fonctionnement" };

    try {
      await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Erreur écriture data.json:", err);
      return res.status(500).json({ error: "Impossible d’écrire dans data.json" });
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
