import { merge } from 'lodash';

import { resolver as teamsResolver, typeDef as teamsTypeDef } from "./teams";
import { resolver as filesResolver, typeDef as filesTypeDef } from "./files";
import { resolver as postsResolver, typeDef as postsTypeDef } from "./posts";
import { resolver as tasksResolver, typeDef as tasksTypeDef } from "./tasks";
import { resolver as notificationsResolver, typeDef as notificationsTypeDef } from "./notifications";

let defaultTypeDef = `
scalar JSON 
scalar Date

type Query{
    _empty:String
}

type Mutation{
    _empty:String
}
`;

export const typeDefs = [defaultTypeDef, teamsTypeDef, filesTypeDef, postsTypeDef, tasksTypeDef, notificationsTypeDef];
export const resolvers = merge(teamsResolver, filesResolver, postsResolver, tasksResolver, notificationsResolver);