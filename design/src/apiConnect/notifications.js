import { GraphQuery, GraphJson } from "./index.js";

export async function getAll(args = "content, icon, active, type") {
    let query = `
            query{
                notifications{
                    ${args}
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;
}