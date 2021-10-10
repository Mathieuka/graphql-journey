import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { CommentsDataType, PostDataType, UserDataType } from '../db';

const post: Resolvers = {
  Query: {
    posts: (parent, args, { db }) => db.posts,
  },
  Mutation: {
    createPost: (parent, {
      post: {
        title, body, published, author,
      },
    }, { db }, info) => {
      const userExist = db.users.some(({ id }: UserDataType) => id === author);
      if (!userExist) {
        throw new Error('User not found');
      }
      const newPost = {
        id: uuidv4(),
        title,
        body,
        author,
        published,
        comments: [],
      };
      db.posts.push(newPost);
      return newPost as unknown as Post;
    },
  },
  Post: {
    author: (parent, args, { db }) => {
      const result = db.users.find(({ id }: UserDataType) => id === (<unknown>parent as PostDataType).author);
      return result as User;
    },
    comments: (parent, args, { db }) => {
      const result = (db.comments as CommentsDataType[])
        .filter((comment) => (<unknown>parent as PostDataType).comments.includes(comment.id));
      return result as unknown as Comment[];
    },
  },
};

export default post;
