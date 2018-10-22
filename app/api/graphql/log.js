import { db } from "../Database.js";

export let Log = async (req, type, args) => {
    let query = await db.none(`INSERT INTO 
            log(type, ipv4, args) 
            VALUES($1,$2,$3)
            `, [type, "0000", JSON.stringify(args)]);
}