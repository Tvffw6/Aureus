import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data.json");

export default async function handler(req,res){
    let data = {};
    try { data = JSON.parse(await fs.readFile(dataFile,"utf-8")); } 
    catch { data = { users:{}, sites:[], forum:[] }; }

    if(req.method==="GET") return res.status(200).json(data.forum);

    if(req.method==="POST") {
        const { user,text } = req.body;
        if(!user||!text) return res.status(400).json({ error:"Champs manquants" });
        data.forum.push({ user,text });
        await fs.writeFile(dataFile, JSON.stringify(data,null,2));
        return res.status(200).json({ success:true });
    }

    res.status(400).json({ error:"Méthode non supportée" });
}
