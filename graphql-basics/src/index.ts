import { ApolloServer } from 'apollo-server';
import typeDefs, { Post, Resolvers, User } from './schema';
import { users, posts, commentaries } from './data/dummyData';

const resolvers: Resolvers = {
  Query: {
    me: () => users[0] as unknown as User,
    posts: () => posts as unknown as Post[],
    users: (parent, { range: rangeID }, ctx, info) => {
      if (!rangeID) return users as unknown as User[];
      const { min, max } = rangeID;
      return users.filter(({ id }) => Number(id) >= min && Number(id) <= max) as unknown as User[];
    },
  },
  Post: {
    author: (parent, args, ctx, info) => {
      const result = users.find((user) => user.id === parent.author as any);
      return result as unknown as User;
    },
  },
  User: {
    posts: (parent, ctx, info) => {
      const result = posts.filter((post) => post.author === parent.id);
      return result as unknown as Post[];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
