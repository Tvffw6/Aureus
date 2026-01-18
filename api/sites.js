import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data.json");

export default async function handler(req, res) {
  let data;
  try {
    const file = await fs.readFile(dataFile, "utf-8");
    data = JSON.parse(file);
  } catch {
    data = { users: {}, sites: [], forum: [] };
  }

  if (req.method === "GET") return res.status(200).json(data.sites);

  if (req.method === "POST") {
    data.sites.push(req.body);
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    const i = req.body.index;
    if (i >= 0 && i < data.sites.length) data.sites.splice(i, 1);
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(400).json({ error: "Méthode non supportée" });
}
