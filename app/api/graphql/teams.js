import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
import { Log } from "./log";

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
    description: String,
    link: String,
    members: JSON, 
    logo: String, 
    contacts: JSON
  }

  extend type Query {
    team(args:JSON): [Team],
    teamEditKey(args:JSON) : Boolean,
    teamViewKey(args:JSON) : Boolean
  }

  extend type Mutation{
      addTeam(args:JSON): Boolean,
      updateTeam(args:JSON): Boolean
  }
`;

export let resolver = {
    Query: {
        async team(_, input) {
            let team = null;

            let args = input.args;

            //console.log('args', args);

            if (args && args.id) {
                team = await db.many(`SELECT * from teams WHERE id=${args.id}`)
            }

            else if (args && args.name) {
                team = await db.many(`SELECT * from teams WHERE name=${args.name}`)
            }

            else {
                team = await db.many("SELECT * FROM teams");
            }

            return team;
        },
        async teamEditKey(_, input) {
            let args = input.args;
            let result = await db.one(`SELECT edit_key FROM teams WHERE id=${args.id}`);
            if (args.key == result.edit_key)
                return true;
            else
                return false;

        },
        async teamViewKey(_, input) {
            let args = input.args;
            let result = await db.one(`SELECT view_key FROM teams WHERE id=${args.id}`);
            if (args.key == result.view_key)
                return true;
            else
                return false;

        }
    },
    Mutation: {
        //ADD
        async addTeam(_, { args }, req) {
            let edit_key = await GenerateKey('edit_key');
            let view_key = await GenerateKey('view_key');
            let input = args;

            let query = await db.none(`INSERT INTO 
            teams(name, edit_key, logo, members, link, contacts, view_key) 
            VALUES($1,$2,$3,$4,$5,$6,$7)
            `, [input.name, edit_key, input.logo, input.members, input.link, input.contacts, view_key]);

            Log(req, "insert@team", args);
            return true;
        },

        async updateTeam(_, { args }, req) {

            let original = await db.one(`SELECT * FROM teams WHERE id=${args.id}`);
            let input = Object.assign(original, args);

            console.log("team Update", input);

            //Only requests containing a valid edit_key are allowed to update db content
            if (input.edit_Key == original.edit_Key) {
                console.log("EXECUTING QUERY")
                let query = await db.one(`UPDATE teams SET
                (name, logo, description, members, link, contacts) = ($1,$2,$3,$4,$5, $6) WHERE id=${args.id} RETURNING *
                `, [input.name, input.logo, input.description, input.members, input.link, input.contacts]);

                Log(req, "update@team", args);
                return true;
            } else {
                return false;
            }

        }
    }
}

let GenerateKey = async (key_name, table_name = "teams") => {
    let keyIsUsed = true;

    let new_key;
    while (keyIsUsed) {
        new_key = cryptoRandomString(16);

        let findKey = await db.any(`SELECT * FROM ${table_name} WHERE ${key_name}='${new_key}'`);

        keyIsUsed = findKey.length > 0 ? true : false;

    }

    return new_key;
}

export async function ValidateEditKey(id, edit_key) {
    let result = await db.one(`SELECT edit_key FROM teams WHERE id=${id}`);
    if (edit_key == result.edit_key)
        return true;
    else
        return false;

}

export async function ValidateViewKey(id, view_key) {
    let result = await db.one(`SELECT view_key FROM teams WHERE id=${id}`);
    if (view_key == result.view_key)
        return true;
    else
        return false;

}