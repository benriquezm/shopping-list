const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User Type",
    fields: () => ({
        id: { type: GraphQLID },
        fullname: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
    })
});

module.exports = { UserType };
