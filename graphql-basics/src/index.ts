import { ApolloServer } from 'apollo-server';
import { DocumentNode } from 'graphql';
import typeDefs, { Resolvers } from './schema';
import resolvers from './resolvers';
import db, { DB } from './db';

export interface Context {
  db: DB
}

interface ApolloServerConfig {
  typeDefs: string | DocumentNode | DocumentNode[] | string[] | undefined;
  resolvers: Resolvers;
  context: Context
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
} as ApolloServerConfig);

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
