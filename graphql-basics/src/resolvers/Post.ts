import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../schema';
import {
  CommentsDataType, DB, PostDataType, UserDataType,
} from '../db';

const removePostOfTheUser = (id: string, db: DB) => new Promise((resolve) => {
  db.users.forEach(({ posts }) => {
    posts.filter((post) => post !== id);
  });
  setTimeout(() => resolve(console.log('[Post of the User removed]')), 1000);
});

const removePost = (id: string, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.posts = [...db.posts.filter((post) => post.id !== id)];
  db.users.forEach(({ posts }) => {
    posts.filter((post) => post !== id);
  });
  setTimeout(() => resolve(console.log('[Post removed]')), 1000);
});

const removeComment = (id: string, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.comments = [...db.comments.filter(({ post }) => post !== id)];
  setTimeout(() => resolve(console.log('[Comment of the Post removed]')), 1000);
});

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
    deletePost: async (parent, { id }, { db, pubsub }, info) => {
      const postToBeDeleted = (db as DB).posts.find(({ id: postId }) => postId === id);
      if (!postToBeDeleted) {
        throw new Error('Post not founded');
      }
      await removePostOfTheUser(id, db);
      await removeComment(id, db);
      await removePost(id, db);

      await pubsub.publish('POST', {
        post: {
          mutation: 'DELETED',
          data: postToBeDeleted as unknown as Post,
        },
      });

      return postToBeDeleted as unknown as Post;
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
