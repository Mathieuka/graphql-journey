import { ApolloServer } from 'apollo-server';
import typeDefs, {
  Comments, Post, Resolvers, User,
} from './schema';
import {
  users, posts, comments, PostDataType, CommentsDataType,
} from './data/dummyData';

const resolvers: Resolvers = {
  Query: {
    me: () => <unknown>users[0] as User,
    posts: () => <unknown>posts as Post[],
    users: (parent, { range: rangeID }) => {
      if (!rangeID) return <unknown>users as User[];
      const { min, max } = rangeID;
      const result = <unknown>users.filter(({ id }) => Number(id) >= min && Number(id) <= max);
      return result as User[];
    },
    comments: () => <unknown>comments as Comments [],
  },
  Comments: {
    author: (parent) => {
      const result = <unknown>users.find((user) => user.id === (<unknown>parent as CommentsDataType).author);
      return result as User;
    },
  },
  Post: {
    author: (parent) => {
      const result = <unknown>users.find((user) => user.id === (<unknown>parent as PostDataType).author);
      return result as User;
    },
    comments: (parent) => {
      const commentsOfThePost = comments
        .filter((commentary) => (<unknown>parent as PostDataType).comments.includes(commentary.id));
      return <unknown>commentsOfThePost as Comments [];
    },
  },
  User: {
    posts: (parent) => {
      const result = <unknown>posts.filter((post) => post.author === parent.id);
      return result as Post[];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
