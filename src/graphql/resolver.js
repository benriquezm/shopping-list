const shoppingList = require('./shoppingList/resolver');

const query = {
  Query: {
    ...shoppingList.Query,
  },
};

const mutation = {
  Mutation: {
    ...shoppingList.Mutation,
  },
};

module.exports = {
  ...query,
  ...mutation,
  ...shoppingList,
};
