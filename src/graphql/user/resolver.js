const User = require('../../models/user');
const { Mutation } = require('./mutations');

const UserResolver = {
    User: {
        id: (user) => user.id,
        fullname: (user) => user.fullname,
        username: (user) => user.username,
        password: (user) => user.password,
        email: (user) => user.email,
        phone: (user) => user.phone,
        address: (user) => user.address,
        city: (user) => user.city,
        country: (user) => user.country,
    },

    Register: {
        accessToken: (user) => user,
    },

    Query: {
        users: async () => {
            const users = await User.find();
            return users;
        },
    },

    Mutation,
};

module.exports = UserResolver;
