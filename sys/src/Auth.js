import { db } from "./Database.js";

export async function GetTeamById(id) {
    try {
        let result = await db.one(`SELECT * FROM teams WHERE id=${id}`);
        return result;
    }
    catch (e) {
        return null;
    }
}

export async function GetTeamFromSubscriptionKey(subscrition_key) {
    try {
        let result = await db.one(`SELECT id, name, edit_key, view_key FROM teams WHERE subscription_key='${subscrition_key}'`);
        return result;
    }
    catch (e) {
        return false;
    }
}

export async function RegisterUser(user, subscrition_key) {
    try {
        let team = await GetTeamFromSubscriptionKey(subscrition_key);
        console.log("team", team);

        let userInDB = await db.any(`SELECT * FROM users WHERE uid='${user.uid}'`);
        console.log("user", userInDB);
        let isMentor = await db.any(`SELECT * FROM mentors WHERE email='${user.email}'`);

        if (isMentor.length) {
            isMentor = true;
        }

        if (!userInDB.length) {//register user
            console.log("registering user");
            let query = await db.none(`INSERT INTO 
            users(uid, name, email, team, is_mentor) 
            VALUES($1,$2,$3,$4,$5)
            `, [user.uid, user.displayName, user.email, team.id, isMentor]);

            let editKey = team.edit_key;
            let viewKey = team.view_key;
            return { id: team.id, editKey, viewKey };

        } else {
            console.log("user already in db")
            team = await GetTeamById(userInDB[0].team);
            //user already in database
            let editKey = team.edit_key;
            let viewKey = team.view_key;
            if (isMentor)
                editKey = null;
            else
                viewKey = null;

            return { id: team.id, editKey, viewKey };
        }




        return null;
    }
    catch (e) {
        console.log("error", e);
        return false;
    }
}

export async function ValidateEditKey(id, edit_key) {
    try {
        let result = await db.one(`SELECT edit_key FROM teams WHERE id=${id}`);
        if (edit_key == result.edit_key && result.edit_key != null)
            return true;
        else
            return false;
    }
    catch (e) {
        return false;
    }
}

export async function ValidateViewKey(id, view_key) {
    let result = await db.one(`SELECT view_key FROM teams WHERE id=${id}`);

    if (view_key == result.view_key && result.view_key != null)
        return true;
    else
        return false;
}

export async function ValidateRequest(teamId, editKey, viewKey) {
    let canEdit = false;
    let canView = false;

    try {
        canView = await ValidateViewKey(teamId, viewKey);
        canEdit = await ValidateEditKey(teamId, editKey);
    } catch (e) {

    }

    return ({ canEdit, canView });
}