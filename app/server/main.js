import { Meteor } from 'meteor/meteor';
import { Teams } from '../model/teams.js';
import { Files } from '../model/files.js';
import { Posts } from '../model/posts.js';

//import { Events } from'../model/events.js';
//import { Tasks } from'../model/tasks.js';
//import { SubmittedTasks } from'../model/submitted_tasks.js';

import { Accounts } from 'meteor/accounts-base'

import { db } from "../api/Database";

Accounts.onCreateUser((options, user) => {
  console.log("creating user", user);
  let email = user.emails[0].address;
  let id = user._id;

  db.none('INSERT INTO users(meteor_id,email) VALUES($1,$2)', [id, email])
    .then(() => {
      // success;
    })
    .catch(error => {
      // error;
    });
  return user;
});

Accounts.onLogin(async (info) => {
  console.log('login info', info.user);
  let id = info.user._id;
  let email = info.user.emails[0].address;

  let findUser = await db.any(`SELECT * FROM users WHERE meteor_id='${id}'`);

  if (findUser.length > 0) {
    db.none('INSERT INTO users(meteor_id,email) VALUES($1,$2)', [id, email]);
  }

});

import "../api/";

Meteor.startup(() => {
  // code to run on server at startup
});
