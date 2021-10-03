import { ApolloServer } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';
import typeDefs, {
  Comment, Post, Resolvers, User,
} from './schema';
import {
  users, posts, comments, PostDataType, CommentsDataType, UserDataType,
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
    comments: () => comments as unknown as Comment [],
  },
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const emailTaken = users.some(({ email }: UserDataType) => email === args.email);
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: (args?.age && Number(args?.age)) || null,
        posts: [],
        comments: [],
      };

      users.push(user);

      return user;
    },
    createPost: (parent, {
      title, body, published, author,
    }, ctx, info) => {
      const userExist = users.some(({ id }) => id === author);
      if (!userExist) {
        throw new Error('User not found');
      }
      const post = {
        id: uuidv4(),
        title,
        body,
        author,
        published,
        comments: [],
      };
      posts.push(post);
      return post as unknown as Post;
    },
    createComment: (parent, { body, post, author }, ctx, info) => {
      const userExist = users.some(({ id }) => id === author);
      const postExist = posts.some(({ id, published }) => id === post && published);
      if (!userExist) throw new Error('User not found');
      if (!postExist) throw new Error('Post not found');

      const id = uuidv4();
      const comment: CommentsDataType = {
        id,
        body,
        author,
        post,
      };

      // enrich posts
      posts.forEach((_post) => {
        if (_post.id === post) {
          _post.comments.push(id);
        }
      });
      // update comments
      comments.push(comment);

      return comment as unknown as Comment;
    },
  },
  Comment: {
    author: (parent) => {
      const result = <unknown>users.find((user) => user.id === (<unknown>parent as CommentsDataType).author);
      return result as User;
    },
    post: (parent) => {
      const result = <unknown>posts.find(({ comments: _comments }) => _comments.includes((<unknown>parent as CommentsDataType).post));
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
      return result as unknown as Comment[];
    },
  },
  User: {
    posts: (parent) => {
      const result = posts.filter((post) => post.author === parent.id);
      return result as unknown as Post[];
    },
    comments: (parent) => {
      const result = comments.filter(({ author }) => author === parent.id);
      return result as unknown as Comment[];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
