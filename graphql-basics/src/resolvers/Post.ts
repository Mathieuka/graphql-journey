import {
  Post, Resolvers, User, Comment,
} from '../schema';
import { DB } from '../db';
import { Context } from '../context';

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
    posts: async (parent, args, { prisma }: Context) => {
      const posts = await prisma.post.findMany();
      if (!posts) {
        throw new Error('Posts not found');
      }
      return posts as Post[];
    },
  },
  Mutation: {
    createPost: async (parent, {
      post: {
        title, body, published, author,
      },
    }, { prisma }: Context, info) => {
      const authorTemp = await prisma.user.findUnique({
        where: {
          id: author,
        },
      });

      if (!authorTemp) {
        throw new Error('User not found');
      }

      const newPost = await prisma.post.create({
        data: {
          authorId: author,
          title,
          body,
          published,
        },
      });

      if (!newPost) {
        throw new Error('Post not created');
      }

      return newPost as Post;
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
    author: async (parent, args, { prisma }: Context) => {
      const author = await prisma.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
      if (!author) {
        throw new Error('Author not found for this post');
      }
      return author as User;
    },
    comments: async (parent, args, { prisma }:Context) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parent.id,
        },
      });
      if (!comments) {
        throw new Error('No comments found');
      }
      return comments as Comment[];
    },
  },
};

export default post;
