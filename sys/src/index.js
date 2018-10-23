import express from 'express';
import cors from 'cors';
import path from 'path';
//import reload from 'express-reload';

//GraphQL dependencies
import graphqlHTTP from 'express-graphql';
import { typeDefs, resolvers } from './graphql'
import { makeExecutableSchema } from 'graphql-tools';
import { ValidateRequest } from "./Auth";

//React Server-side rendering 
import React from "react";
import { renderToString } from 'react-dom/server'; // <-- renderToString() will take our React app and turn it into a string to be inserted into our Html template function.
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet

import App from './client/App';
import Html from './client/Html';
//import Home from "./client/Home.html";

var app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));

//hot reload
var clientPath = path.join(__dirname, '/client/');
//app.use(reload(clientPath));

var chokidar = require('chokidar');
var watcher = chokidar.watch(clientPath);
watcher.on('ready', function () {
    watcher.on('all', function () {
        console.log("Clearing /app/ module cache from server")
        Object.keys(require.cache).forEach(function (id) {
            if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
        })
    })
})

/*** Home ***/
app.get('/', async (req, res) => {
    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
    const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
    const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
    const title = 'Home';

    res.send(
        Html({
            body,
            styles, // <-- passing the styles to our Html template
            title
        })
    );
});

app.use('/public', express.static(__dirname + '/client/public'));

app.use('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/home.html'));
});

app.use('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/register.html'));
});

app.use('/static', express.static(__dirname + '/client/team/static'));

app.use('/team', async (req, res) => {
    let teamId = req.query.id;
    let editKey = req.query.edit;
    let viewKey = req.query.view;
    let keysAuth = await ValidateRequest(teamId, editKey, viewKey);

    console.log(keysAuth);
    if (!keysAuth.canEdit && !keysAuth.canView)
        res.redirect('/home');

    res.sendFile(path.join(__dirname + '/client/team/index.html'));
});

const port = process.env.PORT;
app.listen(port);

console.log(`🚀 Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
console.log(`Serving at http://localhost:${port}`);
