import { db } from "../Database.js";
import GraphQLJSON from 'graphql-type-json';
import { ValidateEditKey, ValidateViewKey } from "./teams";

export const typeDef = `
  type Task{
    id: Int, 
    title: String, 
    open: Boolean,
    content: String, 
    start_date: Date,
    end_date: Date,
    url: String,
    type: String
  }

  type TaskContent{
    id: Int,
    content: String, 
    files: JSON, 
    team: Int, 
    task: Int
    timestamp: Date
  }

  extend type Query {
    tasks(args:JSON): [Task],
    taskContent(args:JSON): [TaskContent],
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
                `SELECT * FROM tasks ORDER BY id ASC`
            );
            return tasks;
        },
        async taskContent(_, { args }) {
            let { task, team } = args;

            //only requests with a valid View Or Edit keys 
            let valid = await ValidateAction(args);

            if (!valid)
                return null

            let taskContent = await db.any(
                `SELECT * FROM teams_tasks WHERE team=${team} AND task=${task} ORDER BY id DESC LIMIT 1`
            );

            return taskContent;
        }
    },

    Mutation: {
        async sendTask(_, { args }, req) {

            let { content, team, task, files, editKey } = args;

            let valid = await ValidateAction(args);

            if (!valid)
                return false

            let query = await db.none(`INSERT INTO 
            teams_tasks(content, team, task, files) 
            VALUES($1,$2,$3,$4)
            `, [content, team, task, files]);

            return true;
        },

        async editTask(_, { args }, req) {

            let valid = await ValidateAction(args);

            if (!valid)
                return false

            let original = await db.one(`SELECT * FROM teams_tasks WHERE id=${args.id}`);
            let { content, files } = Object.assign(original, args);

            let tasks = await db.one(`UPDATE teams_tasks SET
            (content, files, timestamp) = ($1,$2,now()) WHERE id=${args.id} RETURNING *`,
                [content, files]);

            return tasks;
        }
    }
}