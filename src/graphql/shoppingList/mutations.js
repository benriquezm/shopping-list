const Product = require('../../models/shoppingList');

const productMutation = {
    Mutation: {
        addItem: async (_, input) => {
            const {
                productName,
                quantity,
                position,
            } = input;

            const data = {
                productName,
                quantity,
                position,
            };

            const product = await Product.create(data);

            await product.save();
            return product;
        },
    }
};

module.exports = productMutation;
