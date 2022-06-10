const { GraphQLList } = require('graphql');

const User = require('../../models/user');
const { UserType } = require('./type');

const users = {
    type: new GraphQLList(UserType),
    description: "Get list of users.",
    resolve: async() => await User.find(),
};

module.exports = { users };
