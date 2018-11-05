import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';

import bodyParser from 'body-parser';
//import reload from 'express-reload';

//GraphQL dependencies
import graphqlHTTP from 'express-graphql';
import { typeDefs, resolvers } from './graphql'
import { makeExecutableSchema } from 'graphql-tools';
import { ValidateRequest, GetTeamById } from "./Auth";

//React Server-side rendering 
import React from "react";
import { renderToString } from 'react-dom/server'; // <-- renderToString() will take our React app and turn it into a string to be inserted into our Html template function.
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet

import App from './client/App';
import Html from './client/Html';

import * as auth from "./Auth";

var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//session
app.use(session({
    secret: '3dPc7PCn8JVgf4LJ',
    resave: true,
    saveUninitialized: true
}));

app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));

//--------server-side rendering
// app.get('/app', async (req, res) => {
//     const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
//     const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
//     const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
//     const title = 'Home';
//     res.send(
//         Html({
//             body,
//             styles, // <-- passing the styles to our Html template
//             title
//         })
//     );
// });

app.use('/public', express.static(path.join(__dirname + '/client/public')));

//--------- Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/Home.html'), { name: "TEAM NAME" });

    /*
    if (req.query.subscription) {
        //register a new team
    } else
        res.render(path.join(__dirname + '/client/Home.html'), { name: "TEAM NAME" });*/
});

/*** Register - server-side rendering ***/
app.get('/register', async (req, res) => {
    /* const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
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
 
     console.log(req.query.subscription);
 */
    res.sendFile(path.join(__dirname + '/client/Register.html'));
});

app.use('/static', express.static(__dirname + '/client/team/static'));
app.get('/team', async (req, res) => {

    let teamId = req.query.id;
    let editKey = req.query.edit;
    let viewKey = req.query.view;
    let keysAuth = await ValidateRequest(teamId, editKey, viewKey);

    console.log(keysAuth);
    if (!keysAuth.canEdit && !keysAuth.canView)
        res.redirect('/error?type=0');

    res.sendFile(path.join(__dirname + '/client/team/index.html'));
});


app.get('/error', async (req, res) => {
    res.sendFile(path.join(__dirname + '/client/Error.html'));
});

//user routering
app.get('/login', async (req, res) => {

    if (req.query.config) {
        let config = JSON.parse(decodeURIComponent(req.query.config));
        //console.log('config',config);
        let register = await auth.RegisterUser(config.user, config.subscription);
        if (register) {
            let { id, editKey, viewKey } = register;
            console.log(`/team?id=${id}&edit=${editKey}`);

            if (editKey)
                res.redirect(`/team?id=${id}&edit=${editKey}`);
            else
                res.redirect(`/team?id=${id}&view=${viewKey}`);
        }
    } else {
        res.redirect('/error?type=1');
    }


    /*
    let subscriptionKey = req.query.subscriptionKey;
    let user = JSON.parse(req.query.user);

    res.redirect('/team'); 
*/


    //res.sendFile(path.join(__dirname + '/client/team/index.html'));
});

const port = process.env.PORT;
app.listen(process.env.PORT || 8080);


console.log(`🚀 Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
console.log(`Serving at http://localhost:${port}`);
