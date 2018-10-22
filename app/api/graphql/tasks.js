import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
import { ValidateEditKey, ValidateViewKey } from "./teams";

export const typeDef = `
  type Task{
    id: Int, 
    title: String, 
    open: Boolean,
    content: String, 
    start_date: String,
    end_date: String,
    url: String
  }

  type TaskContent{
    id: Int,
    content: String, 
    files: JSON, 
    team: Int, 
    task: Int
    timestamp: String
  }

  extend type Query {
    tasks(args:JSON): [Task],
    sentTasks(args:JSON): [TaskContent]
  }

  extend type Mutation{
      sendTask(args:JSON):Boolean,
      editTask(args:JSON):TaskContent
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
        async tasks(_, { args }) {
            let tasks = await db.many(
                `SELECT * FROM tasks ORDER BY start_date DESC`
            );
            return tasks;
        },
    },
    Mutation: {
        async addPost(_, { args }, req) {

            let { title, content, team, files, thumbnail, editKey } = args;

            let valid = await ValidateAction(args);

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

            let valid = await ValidateAction(args);

            if (!valid)
                return null;

            let post = await db.one(`UPDATE posts SET
            (title, content, team, files, thumbnail, visible) = ($1,$2,$3,$4,$5,$6) WHERE id=${args.id} RETURNING *`,
                [title, content, team, files, thumbnail, visible]);

            return post;
        }
    }
}