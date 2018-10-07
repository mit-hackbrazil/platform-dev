import { GraphQuery } from "./index.js";

export default class Teams {

    static getCurrent() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        var key = url.searchParams.get("key");
        console.log("current team", id, key);
        return { id, key };
    }

    static async get(id) {
        `
        query{
            team(args:{name:"Test"}){
                 id, name,members,link
            }
        }
        `
    }



}
