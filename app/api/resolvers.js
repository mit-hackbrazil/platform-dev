// create the resolve functions for the available GraphQL queries
export default resolvers = {

    Query: {
        test(_, args) {
            return "hackbrazil"//Post.findAll({ where: args });
        },
    }
};