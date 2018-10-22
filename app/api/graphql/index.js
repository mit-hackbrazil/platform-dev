import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

import { resolver as teamsResolver, typeDef as teamsTypeDef } from "./teams";
import { resolver as filesResolver, typeDef as filesTypeDef } from "./files";
import { resolver as postsResolver, typeDef as postsTypeDef } from "./posts";
import { resolver as tasksResolver, typeDef as tasksTypeDef } from "./tasks";

const { GraphQLUpload } = require('apollo-server')

let defaultTypeDef = `
scalar JSON 

type Query{
    _empty:String
}

type Mutation{
    _empty:String
}
`;

export const typeDefs = [defaultTypeDef, teamsTypeDef, filesTypeDef, postsTypeDef, tasksTypeDef];
export const resolvers = merge(teamsResolver, filesResolver, postsResolver, tasksResolver);