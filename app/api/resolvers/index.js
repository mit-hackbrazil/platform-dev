import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

//let Teams = new Mongo.Collection('teams');
import { Teams } from "../../model/teams.js";
import { Test } from "../../model/test.js";

import { resolver as teamsResolver } from "./teams";

export default resolvers = merge(teamsResolver);

/*
// create the resolve functions for the available GraphQL queries
export default resolvers = {

    Query: {
        test(_, args) {
            Test.insert({ name: "test" });
            let teams = Test.find().count();//Mongo.Collection.get('teams').find();
            console.log(teams);
            return teams;

            //return "hackbrazil-test"//Post.findAll({ where: args });
        },
    }
};*/