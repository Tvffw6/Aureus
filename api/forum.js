import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "data.json");
  let data;
  try { data = JSON.parse(await fs.readFile(filePath, "utf8")); } 
  catch { return res.status(500).json({ error: "Impossible de lire data.json" }); }

  const { action, post } = req.body || {};

  if (req.method === "POST") {
    if (!action || !post) return res.status(400).json({ error: "Paramètres manquants" });

    if (action === "add") data.forum.push(post);

    try { await fs.writeFile(filePath, JSON.stringify(data, null, 2)); } 
    catch { return res.status(500).json({ error: "Impossible d’écrire dans data.json" }); }

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") return res.status(200).json({ forum: data.forum });

  return res.status(405).json({ error: "Méthode non autorisée" });
}
