import axios from "axios";
import api, { GraphQLCall } from "graphql-call";
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import * as _teams from "./teams";
import * as _posts from "./posts";
import * as _tasks from "./tasks";
import * as _notifications from "./notifications";

//const stringifyObject = require('stringify-object');

//graphUrl
const GRAPH_URL = process.env.NODE_ENV === 'production' ? "https://hackbrazil-platform.appspot.com/graphql" : "http://localhost:3000/graphql"; //change for production

if (process.env.NODE_ENV === 'production') {
    console.log("PRODUCTION MODE");
}
else{
    console.log("DEVELOPMENT MODE")
}
export function GraphJson(obj) {
    /*  const pretty = stringifyObject(obj, {
          indent: '  ',
          singleQuotes: false
      });
      console.log("pretty", pretty);*/

    let pretty = JSON.stringify(obj);

    return pretty;
}

export async function GraphQuery(query, url = GRAPH_URL) {
    let call = await axios({
        url: url,
        method: 'post',
        data: {
            query: query
        }
    });

    return call.data.data;

}

export function getCredentials() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    var editKey = url.searchParams.get("edit");
    var viewKey = url.searchParams.get("view");

    return { id, editKey, viewKey };
}

let apiConnect = {
    getCredentials: getCredentials,
    teams: _teams,
    posts: _posts,
    tasks: _tasks,
    notifications: _notifications
}

export default apiConnect;