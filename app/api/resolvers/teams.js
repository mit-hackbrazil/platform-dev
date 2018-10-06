import { db } from "../Database.js";
const cryptoRandomString = require('crypto-random-string');

export let resolver = {
    Query: {
        teams(_, args) {
            //Test.insert({ name: "test" });
            //let teams = Test.find().count();//Mongo.Collection.get('teams').find();
            //console.log(teams);
            //return teams;
            return "all teams :)";
            //return "hackbrazil-test"//Post.findAll({ where: args });
        },
    }
}