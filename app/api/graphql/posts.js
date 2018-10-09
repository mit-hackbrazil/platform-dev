import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
import { ValidateEditKey, ValidateViewKey } from "./teams";

export const typeDef = `

  type PostFile{
        name: String, 
        url: String,
        size: Int
  }

  type Post{
    id: Int,
    title: String,
    content: String,
    team: Int,
    timestamp: String,
    thumbnail:String,
    files:JSON,
    update:String
  }

  extend type Query {
    posts(args:JSON): [Post],
  }

  extend type Mutation{
      addPost(args:JSON):Boolean,
      editPost(args:JSON):Post
  }
  
`;

async function ValidateAction(args) {
    let team_id = args.team;
    let { editKey, viewKey } = args;
    let valid = false;

    if (editKey) {
        valid = await ValidateEditKey(team_id, editKey);
    }
    else if (viewKey) {
        valid = await ValidateViewKey(team_id, viewKey);
    }
    else return false;

    return valid;
}

export let resolver = {
    Query: {
        async posts(_, { args }) {
            let team_id = args.team;
            let { editKey, viewKey } = args;

            let valid = ValidateAction(args);

            if (!valid)
                return null

            let posts = await db.many(
                `SELECT * FROM posts WHERE team=${team_id} ORDER BY update DESC`
            );

            return posts;

        },

    },
    Mutation: {
        async addPost(_, { args }, req) {

            let { title, content, team, files, thumbnail, editKey } = args;

            let valid = ValidateAction(args);

            if (!valid)
                return null

            let query = await db.none(`INSERT INTO 
            posts(title, content, team, files, thumbnail) 
            VALUES($1,$2,$3,$4,$5)
            `, [title, content, team, files, thumbnail]);

            return true;
        },

        async editPost(_, { args }, req) {

            let original = await db.one(`SELECT * FROM posts WHERE id=${args.id}`);
            let { title, content, team, files, thumbnail, editKey, visible } = Object.assign(original, args);

            let valid = ValidateAction(args);

            if (!valid)
                return null;

            let post = await db.one(`UPDATE posts SET
            (title, content, team, files, thumbnail, visible) = ($1,$2,$3,$4,$5,$6) WHERE id=${args.id} RETURNING *`,
                [title, content, team, files, thumbnail, visible]);

            return post;
        }
    }
}