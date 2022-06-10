const jwt = require('jsonwebtoken');

const createJWTToken = (user) => {
    return jwt.sign({user}, 'shoppingList1574', {
        expiresIn: '1d'
    });
};

module.exports = { createJWTToken };
