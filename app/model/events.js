import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Events = new Mongo.Collection('events');

Events.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  start_at: {
    type: Date,
  },
  end_at: {
    type: Date,
  },
  google_calendar: {
    type: String,
  },
})

Events.attachSchema(Events.schema);