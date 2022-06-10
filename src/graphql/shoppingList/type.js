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
