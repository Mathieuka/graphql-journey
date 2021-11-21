import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { Context } from '../context';

const comment: Resolvers = {
  Query: {
    comments: async (parent, args, { prisma }: Context) => {
      const comments = prisma.comment.findMany();
      return comments as unknown as Comment[];
    },
  },
  Mutation: {
    createComment: async (parent, { comment: { body, post, author } }, { pubsub, prisma }: Context, info) => {
      const authorOfTheComment = await prisma.user.findUnique({
        where: {
          id: author,
        },
      });
      if (!authorOfTheComment) {
        throw new Error('No user found');
      }
      const newComment = await prisma.comment.create({
        data: {
          authorId: author,
          postId: post,
          body,
        },
      });

      pubsub.publish(`comment ${post}`, {
        comment: {
          mutation: 'CREATED',
          data: newComment,
        },
      });

      return newComment as Comment;
    }
    ,
  },
  Comment: {
    author: async (parent, args, { prisma }: Context) => {
      const authorOfTheComment = await prisma.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
      if (!authorOfTheComment) {
        throw new Error('Author not found for this post');
      }
      return authorOfTheComment as User;
    },
    post: async (parent, args, { prisma }: Context) => {
      const post = await prisma.post.findUnique({
        where: {
          id: parent.postId,
        },
      });
      if (!post) {
        throw new Error('No comments found');
      }
      return post as Post;
    },
  },
};

export default comment;
