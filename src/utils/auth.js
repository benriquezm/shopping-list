const jwt = require('jsonwebtoken');

const createJWToken = (user) => {
    return jwt.sign({user}, 'shoppingList1574', {
        expiresIn: '1d'
    });
};

module.exports = { createJWToken };
