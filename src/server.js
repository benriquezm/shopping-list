const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
//  const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

const app = express();

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      onConnect: () => console.info('Successfully Connected to websocket'),
      onDisconnect: () => console.info('Unsuccessfully Disconnect from websocket'),
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: true,
    tracing: true,
    playground: process.env.NODE_ENV === 'development',
    onHealthCheck: () =>
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve();
        } else {
          reject();
        }
      }),
  });

  app.use((
    err,
    req,
    res,
    next
  ) =>
    res.status(err.status).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    })
  );

  // const httpServer = http.createServer(app);
  // apolloServer.installSubscriptionHandlers(httpServer);

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
  );
}

startServer();

module.exports = app;
