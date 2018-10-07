import { GraphQuery } from "./index.js";

export async function getCurrent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var key = url.searchParams.get("key");

    console.log("current team", id, key);
    let isValid = await validate(id, key);
    console.log("isValid", isValid);

    return get(id);
}

export async function validate(id, _key) {
    let query = `
        query{
            teamKey(args:{id:${id}, key:"${_key}"})
        }
        `;

    console.log(query);
    let results = await GraphQuery(query);
    return results.teamKey;
}

export async function get(id, args = "id, name, members,link, logo, contacts") {
    let query = `
        query{
            team(args:{id:${id}}){
                 ${args}
            }
        }
        `;
    let results = await GraphQuery(query);
    return results;
}


