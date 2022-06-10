const { GraphQLList } = require('graphql');

const Product = require('../../models/shoppingList');
const { ShoppingListType } = require('./type');

const products = {
    type: new GraphQLList(ShoppingListType),
    description: "Get list of products.",
    resolve: async() => await Product.find(),
};

module.exports = { products };
