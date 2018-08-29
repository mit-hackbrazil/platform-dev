import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection("posts");

Posts.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  title: {
    type: String,
  },
  summary: {
    type: String,
  },
  thumbnail: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  submitted_at: {
    type: Date,
  },
  file_ids: {
    type: Array,
  },
  'file_ids.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  video_url: {
    type: String,
  }
})

Posts.attachSchema(Posts.schema);