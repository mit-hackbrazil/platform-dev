import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

import { resolver as teamsResolver, typeDef as teamsTypeDef } from "./teams";
import { resolver as filesResolver, typeDef as filesTypeDef } from "./files";

let defaultTypeDef = `
scalar JSON 

type Query{
    _empty:String
}

type Mutation{
    _empty:String
}
`;

export const typeDefs = [defaultTypeDef, teamsTypeDef, filesTypeDef];

export const resolvers = merge(teamsResolver, filesResolver);