import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data.json");

export default async function handler(req, res) {
    let data = {};
    try { data = JSON.parse(await fs.readFile(dataFile, "utf-8")); } 
    catch { data = { users:{}, sites:[], forum:[] }; }

    if(req.method === "GET") return res.status(200).json(data.users);

    if(req.method === "POST") {
        const { username, password } = req.body;
        if(!username || !password) return res.status(400).json({ error:"Remplis tous les champs" });
        if(data.users[username]) return res.status(400).json({ error:"Utilisateur déjà existant" });

        data.users[username] = { password, stars:1, isAdmin:false, avatar:"images/default.png", status:"🟢 Fonctionnement" };
        await fs.writeFile(dataFile, JSON.stringify(data,null,2));
        return res.status(200).json({ success:true });
    }

    if(req.method === "DELETE") {
        const { username } = req.body;
        if(username && data.users[username]) delete data.users[username];
        await fs.writeFile(dataFile, JSON.stringify(data,null,2));
        return res.status(200).json({ success:true });
    }

    res.status(400).json({ error:"Méthode non supportée" });
}
