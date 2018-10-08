import { GraphQuery, GraphJson } from "./index.js";

export async function getCurrent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var editKey = url.searchParams.get("edit");

    console.log("current team", id, editKey);
    let isValid = await validateEdit(id, editKey);

    console.log("isValid to Edit", isValid);

    return getOne(id);
}

export async function validateEdit(id, _key) {
    let query = `
        query{
            teamEditKey(args:{id:${id}, key:"${_key}"})
        }
        `;
    let results = await GraphQuery(query);
    return results.teamEditKey;
}

export async function validateView(id, _key) {
    let query = `
        query{
            teamViewKey(args:{id:${id}, key:"${_key}"})
        }
        `;
    let results = await GraphQuery(query);
    return results.teamViewKey;
}

export async function getAll(args = "id, name, members,link, logo, contacts") {
    let query = `
        query{
            team{
                 ${args}
            }
        }
        `;
    let results = await GraphQuery(query);
    return results;
}

export async function getOne(id, args = "id, name, members,link, logo, contacts") {
    let query = `
        query{
            team(args:{id:${id}}){
                 ${args}
            }
        }
        `;
    let results = await GraphQuery(query);
    return results.team[0]; //single return
}

export async function update(teamUpdate) {
    let teamUpdateJSON = GraphJson(teamUpdate);
    console.log(teamUpdateJSON);
    let query = `
        mutation{
            updateTeam(
                args:
                    ${teamUpdateJSON}
            )
        }
        `;
    console.log("query update", query);
    let results = await GraphQuery(query);
    return true; //single return
}