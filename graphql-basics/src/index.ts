import { ApolloServer } from 'apollo-server';
import typeDefs, { Post, Resolvers, User } from './generated';

const users: {
  id: string;
  name: string;
  email: string;
  age: number;
  posts: string[];
}[] = [
  {
    id: '1',
    name: 'Pierre',
    email: 'pierre@gmail.com',
    age: 32,
    posts: ['2', '3'],
  },
  {
    id: '2',
    name: 'Lune',
    email: 'lune@gmail.com',
    age: 39,
    posts: ['1'],
  },
  {
    id: '3',
    name: 'Tom',
    email: 'tom@gmail.com',
    age: 45,
    posts: [],
  },
];

const posts = [
  {
    id: '1',
    title: 'Tutny toons',
    body: 'Hell yeah body',
    published: true,
    author: '2',
  },
  {
    id: '2',
    title: 'babydy boo',
    body: 'babydy boo body',
    published: true,
    author: '1',
  },
  {
    id: '3',
    title: 'Kily gury',
    body: 'Kily gury body',
    published: true,
    author: '1',
  },
];

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
      const result = posts.filter((post) => (parent.posts as any[]).includes(post.id));
      return result as unknown as Post[];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
