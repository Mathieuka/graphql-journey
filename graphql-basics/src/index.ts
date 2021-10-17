import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { PubSub } from 'graphql-subscriptions';
import typeDefs from './schema';
import resolvers from './resolvers';
import db, { DB } from './db';

export interface Context {
  db: DB
  pubsub: unknown
}

const pubsub = new PubSub();
(async function () {
  const app = express();
  const httpServer = createServer(app);
  let server = {} as any;

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams: unknown, webSocket: unknown, context: unknown) => ({
        pubsub,
      }),
    },
    { server: httpServer, path: server.graphqlPath },
  );

  server = new ApolloServer({
    schema,
    resolvers,
    context: async () => ({ db, pubsub } as Context),
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    }],
  });

  await server.start();
  server.applyMiddleware({ app });
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
}());
