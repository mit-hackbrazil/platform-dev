import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const SubmittedTasks = new Mongo.Collection('submitted_tasks');

SubmittedTasks.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  summary: {
    type: String,
  },
  submitted_at: {
    type: Date,
  },
  task_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  team_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  file_ids: {
    type: Array,
  },
  'file_ids.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
})

SubmittedTasks.attachSchema(SubmittedTasks.schema);