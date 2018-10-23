import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import React from "react";
/**
 * renderToString() will take our React app and turn it into a string
 * to be inserted into our Html template function.
 */
import { renderToString } from 'react-dom/server';
import App from './client/App';
import Html from './client/Html';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

/*** Home ***/
app.get('/', (req, res) => {
    const body = renderToString(<App />);
    const title = 'Server side Rendering with Styled Components';
    res.send(
        Html({
            body,
            title
        })
    );
});

/*** Home ***/
app.get('/team', (req, res) => {
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

console.log(`Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
console.log(`Serving at http://localhost:${port}`);
