const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');


const schema = require('./graphql/schema')

const app = express();
const httpServer = http.createServer(app);

async function startServer() {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });

  const serverCleanup = useServer({ schema, context: (ctx, msg, args) => {
    return getDynamicContext(ctx, msg, args);
  }}, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
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

  // apolloServer.installSubscriptionHandlers(httpServer);

  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
    //  console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`);
  });
  /*httpServer.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`)
  );*/
}

startServer();

module.exports = app;
