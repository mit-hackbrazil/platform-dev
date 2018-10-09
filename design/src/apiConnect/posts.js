import { GraphQuery, GraphJson } from "./index.js";
import { storage } from "./storage";

export async function getAll(team_id, editKey, viewKey, args = "id, title, content, files, thumbnail, timestamp, update") {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var team_id = url.searchParams.get("id");
    var editKey = url.searchParams.get("edit");
    var viewKey = url.searchParams.get("view");

    let query = `
            query{
                posts(args:{
                    team:${team_id},
                    editKey:"${editKey}",
                    viewKey:"${viewKey}",
                }){
                    ${args}
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;
}

export async function addPost(team_id, editKey, viewKey, newPost) {

    let { title, content, files, thumbnail } = newPost;

    let filesJSON = GraphJson(files);

    let query = `
        mutation{
            addPost(args:{
                team:${team_id}, 
                editKey:"${editKey}",
                viewKey:"${viewKey}",
                title:"${title}",
                content:"${content}",
                files:${filesJSON},
                thumbnail:${thumbnail}
            })
        }
    `;

    console.log("query", query);

    let results = await GraphQuery(query);
    return results;


}