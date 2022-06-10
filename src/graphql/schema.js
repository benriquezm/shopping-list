const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const { addItem, register } = require('./mutations');
const { products, users } = require('./query');

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    products,
    users,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    addItem,
    register,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
