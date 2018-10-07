import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
const cryptoRandomString = require('crypto-random-string');

let model = {
    name: null,
    link: null,
    members: [],
    logo: null,
    contacts: null
};

export const typeDef = `
  type Team{
    id: Int,
    name: String,
    link: String,
    members: JSON, 
    logo: String, 
    contacts: JSON
  }

  extend type Query {
    team(args:JSON): [Team]
  }

  extend type Mutation{
      addTeam(args:JSON): Boolean,
      updateTeam(args:JSON): Boolean
  }
`;

export let resolver = {
    Query: {
        async team(_, args) {
            let team = null;

            //all
            if (args.id === undefined)
                team = await db.many("SELECT * FROM teams");

            else if (args.id) {
                team = await db.one(`SELECT * from team WHERE id=${args.id}`)
            }

            else if (args.name) {
                team = await db.one(`SELECT * from team WHERE name=${args.name}`)
            }

            return team;
        }
    },
    Mutation: {
        //ADD
        async addTeam(_, { args }, req) {
            let subscription_key = await GenerateKey();
            let input = args;

            let query = await db.none(`INSERT INTO 
            teams(name, subscription_key, logo, members, link, contacts) 
            VALUES($1,$2,$3,$4,$5,$6)
            `, [input.name, subscription_key, input.logo, input.members, input.link, input.contact]);

            return true;
        },

        async updateTeam(_, { args }, req) {

            let original = await db.one(`SELECT * FROM teams WHERE id=${args.id}`);
            let input = Object.assign(original, args);

            let query = await db.one(`UPDATE teams SET
            (name, subscription_key, logo, members, link, contacts) = ($1,$2,$3,$4,$5,$6) WHERE id=${args.id} RETURNING *
            `, [input.name, input.subscription_key, input.logo, input.members, input.link, input.contact]);

            return true;
        }
    }
}

let GenerateKey = async (key) => {
    let keyIsUsed = true;

    let new_key;
    while (keyIsUsed) {
        new_key = cryptoRandomString(10);

        let findKey = await db.any(`SELECT * FROM teams WHERE subscription_key='${new_key}'`);

        keyIsUsed = findKey.length > 0 ? true : false;

    }

    return new_key;
}