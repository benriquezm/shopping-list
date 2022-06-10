const { gql } = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        productName: String!
        quantity: Int!
        position: Int!
    }
    type Query {
        products: [Product!]
    }
    type Mutation {
        addItem(
            productName: String!
            quantity: Int!
            position: Int!
        ): Product
    }
`;

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

const ShoppingListType = new GraphQLObjectType({
    name: "ShoppingList",
    description: "ShoppingList Type",
    fields: () => ({
        id: { type: GraphQLID },
        productName: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        position: { type: GraphQLInt }
    })
});

module.exports = { ShoppingListType };
