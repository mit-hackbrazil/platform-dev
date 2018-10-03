import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export let Test = new Mongo.Collection('test');

let schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    name: String,
});

//Test.attachSchema(Test.schema);
