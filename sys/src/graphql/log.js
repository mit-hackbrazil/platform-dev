import { db } from "../Database.js";

export let Log = async (req, type, args) => {
    let ip = req.socket.address().address;
    console.log("log", ip);

    let query = await db.none(`INSERT INTO 
            log(type, ipv4, args) 
            VALUES($1,$2,$3)
            `, [type, ip, JSON.stringify(args)]);
}