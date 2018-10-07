import axios from "axios";
import api, { GraphQLCall } from "graphql-call";
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import Teams from "./teams";
const stringifyObject = require('stringify-object');

//graphUrl
const GRAPH_URL = "http://localhost:3000/graphql"; //change for production

export function GraphJson(obj) {
    const pretty = stringifyObject(obj, {
        indent: '  ',
        singleQuotes: false
    });
    return pretty;
}

export async function GraphQuery(query, url = GRAPH_URL) {
    return axios({
        url: url,
        method: 'post',
        data: {
            query: query
        }
    });

}



let apiConnect = {
    teams: new Teams(),
}

export default apiConnect;