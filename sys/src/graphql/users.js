//api key
//3dPc7PCn8JVgf4LJ
import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
const cryptoRandomString = require('crypto-random-string');
/*
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
*/

const API_KEY = '3dPc7PCn8JVgf4LJ';

export const typeDef = `
  type User{
    id: Int,
    name: String,
    email: String,
    uid: String,
    timestamp:String,
    team: Int,
    editKey: String,
    viewKey: String,
    isMentor: Boolean
  }

  extend type Query {
    validateUser(args:JSON): Boolean
  }
`;

export let resolver = {
    Query: {
        async validateUser(_, { args }) {
            let { apiKey, user } = args;
            let userOnDB = await db.any(`SELECT * from users WHERE uid='${user.uid}'`);
            if (apiKey != API_KEY)
                return false;

            if (userOnDB) {
                //Login
            }
            else { //Register user

            }
            //all
            if (args.id === undefined)
                file = await db.many("SELECT * FROM users WHERE ");
            /*
                        else if (args.id) {
                            team = await db.one(`SELECT * from team WHERE id=${args.id}`)
                        }
            
                        else if (args.name) {
                            team = await db.one(`SELECT * from team WHERE name=${args.name}`)
                        }
            */
            return file;
        }
    },
    Mutation: {
        async addTeam(_, { args }, req) {

            let query = await db.none(`INSERT INTO 
            teams(name, subscription_key, logo, members, link, contacts) 
            VALUES($1,$2,$3,$4,$5,$6)
            `, [input.name, subscription_key, input.logo, input.members, input.link, input.contact]);

            return true;
        },
        /*
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
        }*/
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