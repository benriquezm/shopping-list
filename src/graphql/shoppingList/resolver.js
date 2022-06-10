const Product = require('../../models/shoppingList');
const { Mutation } = require('./mutations');

const shoppingListResolver = {
    Product: {
        id: (product) => product.id,
        productName: (product) => product.productName,
        quantity: (product) => product.quantity,
        position: (product) => product.position,
    },

    Query: {
        products: async () => {
            const products = await Product.find();
            return products;
        },
    },

    Mutation,
};

module.exports = shoppingListResolver;
