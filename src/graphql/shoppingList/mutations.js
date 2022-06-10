const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLObjectType } = require('graphql');

const Product = require('../../models/shoppingList');
const { ShoppingListType } = require('./type');

const addItem = {
    type: ShoppingListType,
    args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        position: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(_, {
        productName, quantity, position
    }) {
        const product = new Product({
            productName, quantity, position
        });
        await product.save();
        return product;
    },
};

module.exports = {
    addItem,
};
