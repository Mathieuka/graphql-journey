import { ApolloServer } from 'apollo-server';
import { build, fake } from '@jackfranklin/test-data-bot';
import typeDefs, { Post, Resolvers, User } from './generated';

const users = Array.from({ length: 10 }).map((_, idx) => build('User', {
  fields: {
    id: JSON.stringify(idx),
    name: fake((f) => f.random.word()),
    email: fake((f) => f.internet.email()),
    age: fake((f) => f.random.number({ min: 10, max: 200 })),
  },
})()) as unknown as User[];

const posts = Array.from({ length: 10 }).map((_, idx) => build('Post', {
  fields: {
    id: fake((f) => f.random.uuid()),
    title: fake((f) => f.random.word()),
    body: fake((f) => f.random.words()),
    published: fake((f) => f.random.boolean()),
  },
})()) as unknown as Post[];

const resolvers: Resolvers = {
  Query: {
    me: () => users[0],
    post: () => posts[0],
    users: (parent, { range: rangeID }, ctx, info) => {
      if (!rangeID) return users;
      const { min, max } = rangeID;
      return users.filter(({ id }) => Number(id) >= min && Number(id) <= max);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
