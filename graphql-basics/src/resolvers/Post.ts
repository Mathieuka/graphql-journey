import {
  Post, Resolvers, User, Comment,
} from '../schema';
import { Context, pubsub } from '../context';

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

      await pubsub.publish('POST', {
        post: {
          mutation: 'CREATED',
          data: newPost,
        },
      });

      return newPost as Post;
    },
    deletePost: async (parent, { id }, { prisma }: Context, info) => {
      const postToBeDeleted = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!postToBeDeleted) {
        throw new Error('Post not Found');
      }

      const commentIdsOfThePost = await prisma.comment.findMany({
        where: {
          postId: id,
        },
        select: {
          id: true,
        },
      });

      await prisma.comment.deleteMany({
        where: {
          OR: [...commentIdsOfThePost],
        },
      });

      const postDeleted = await prisma.post.delete({
        where: {
          id,
        },
      });

      return postDeleted as Post;
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
