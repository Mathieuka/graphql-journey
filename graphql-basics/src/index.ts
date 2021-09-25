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
    comments: () => comments as unknown as Comments [],
  },
  Comments: {
    author: (parent) => {
      const result = <unknown>users.find((user) => user.id === (<unknown>parent as CommentsDataType).author);
      return result as User;
    },
    post: (parent) => {
      const result = <unknown>posts.find(({ comments: _comments }) => _comments.includes((<unknown>parent as CommentsDataType).post));
      console.log('[result] ', result);
      return result as Post;
    },
  },
  Post: {
    author: (parent) => {
      const result = <unknown>users.find((user) => user.id === (<unknown>parent as PostDataType).author);
      return result as User;
    },
    comments: (parent) => {
      const result = comments
        .filter((comment) => (<unknown>parent as PostDataType).comments.includes(comment.id));
      return <unknown>result as Comments [];
    },
  },
  User: {
    posts: (parent) => {
      const result = <unknown>posts.filter((post) => post.author === parent.id);
      return result as Post[];
    },
    comment: (parent) => {
      const result = <unknown>comments.filter(({ author }) => author === parent.id);
      return result as Comments[];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
