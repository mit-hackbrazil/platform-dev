import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export let Teams = new Mongo.Collection('teams');

let schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  name: String,
  description: String,
  members: {
    type: Array,
  },
  'members.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  logo: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  link: String,
  contacts: Array,
  'contacts.$': String
});

Teams.attachSchema(Teams.schema);