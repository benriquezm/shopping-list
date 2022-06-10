const shoppingList = require('./shoppingList/resolver');
const user = require('./user/resolver');

const query = {
  Query: {
    ...shoppingList.Query,
    ...user.Query,
  },
};

const mutation = {
  Mutation: {
    ...shoppingList.Mutation,
    ...user.Mutation,
  },
};

module.exports = {
  ...query,
  ...mutation,
  ...shoppingList,
  ...user,
};
