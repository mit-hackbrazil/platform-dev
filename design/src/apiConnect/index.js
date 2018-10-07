import axios from "axios";
import api, { GraphQLCall } from "graphql-call";
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
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
    //let login = sessionStorage.getItem('login');
    //let password = sessionStorage.getItem('password');
    //console.log("login", login, password);

    return axios({
        url: url,
        method: 'post',
        data: {
            query: query
        },
        auth: {
            username: login,
            password: password
        },
    });

}
