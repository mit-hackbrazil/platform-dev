import { GraphQuery, GraphJson } from "./index.js";
import { storage } from "./storage";
import * as teams from "./teams";

export async function getAll(args = "id, title, content, files, thumbnail, timestamp, update") {
    let query = `
            query{
                tasks{
                    id, title, content, start_date, end_date, open
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;
}

export async function sendTask(team_id, task_id, editKey, newTask) {

    let { content, files } = newTask;

    let filesJSON = GraphJson(files);

    let query = `
        mutation{
            sendTask(args:{
                team:${team_id}, 
                task:${task_id},
                editKey:"${editKey}",
                content:"${content}",
                files:${filesJSON}
            })
        }
    `;

    let results = await GraphQuery(query);
    return results;
}


export async function editTask(sent_task_id, team_id, editKey, newTask) {

    let { content, files } = newTask;

    let filesJSON = GraphJson(files);

    let query = `
        mutation{
            sendTask(args:{
                id:${sent_task_id}
                team:${team_id},
                editKey:"${editKey}",
                content:"${content}",
                files:${filesJSON}
            })
        }
    `;

    let results = await GraphQuery(query);
    return results;
}

export async function getTaskContent(team, task, viewKey, editKey) {
    let currentTeam = await teams.getCurrent();

    let query = `
            query{
                taskContent(args:{
                    team:${team},
                    task:${task},
                    editKey:"${editKey}",
                    viewKey:"${viewKey}",
                }){
                    id, content, files, timestamp
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;

}
export async function getCurrent() {
    let currentTeam = await teams.getCurrent();

    let query = `
            query{
                tasks{
                    id, title, content, start_date, end_date, open
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;
}
