import { db } from "./Database.js";

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