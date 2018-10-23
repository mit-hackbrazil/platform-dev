import express from 'express';
import cors from 'cors';

//GraphQL dependencies
import graphqlHTTP from 'express-graphql';
import { typeDefs, resolvers } from './graphql'
import { makeExecutableSchema } from 'graphql-tools';
import { ValidateRequest } from "./Auth";

//React Server-side rendering 
import React from "react";
import { renderToString } from 'react-dom/server'; // <-- renderToString() will take our React app and turn it into a string to be inserted into our Html template function.
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet
import App from './views/App';
import Html from './views/Html';

var app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));

/*** Home ***/
app.get('/', async (req, res) => {
    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
    const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
    const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
    const title = 'Server side Rendering with Styled Components';

    let teamId = req.query.id;
    let editKey = req.query.edit;
    let viewKey = req.query.view;

    let keysAuth = await ValidateRequest(teamId, editKey, viewKey);

    console.log(keysAuth);

    res.send(
        Html({
            body,
            styles, // <-- passing the styles to our Html template
            title
        })
    );

});

/*** Team ***/
app.get('/startup', (req, res) => {
    const body = renderToString(<App />);
    const title = 'Server side Rendering with Styled Components';
    res.send(
        Html({
            body,
            title
        })
    );
});

const port = process.env.PORT;
app.listen(port);

console.log(`🚀 Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
console.log(`Serving at http://localhost:${port}`);
