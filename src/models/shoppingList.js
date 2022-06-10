const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        position: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model('ShoppingList', schema);
