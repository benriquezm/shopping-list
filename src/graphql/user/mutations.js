const { GraphQLNonNull, GraphQLString } = require('graphql');

const User = require('../../models/user');
const { createJWTToken } = require('../../utils/auth');

const register = {
    type: GraphQLString,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(_, {
        username, fullname, password, email, phone, address, city, country
    }) {
        const user = new User({
            username, fullname, password, email, phone, address, city, country
        });
        //  user.password = await bcrypt.encryptPassword(user.password);
        await user.save();
    
        const token = createJWTToken({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
        });
        return token;
    },
};

module.exports = {
    register,
};
