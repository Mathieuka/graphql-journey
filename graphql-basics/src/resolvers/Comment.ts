import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { CommentsDataType, PostDataType, UserDataType } from '../db';
import { Context } from '../context';

const comment: Resolvers = {
  Query: {
    comments: (parent, args, { db }) => db.comments,
  },
  Mutation: {
    createComment: async (parent, { comment: { body, post, author } }, { db, pubsub, prisma }: Context, info) => {
      const authorOfTheComment = await prisma.user.findUnique({
        where: {
          id: author,
        },
      });
      if (!authorOfTheComment) {
        throw new Error('No user found');
      }
      const commentTemp = await prisma.comment.create({
        data: {
          authorId: author,
          postId: post,
          body,
        },
      });

      // pubsub.publish(`comment ${post}`, {
      //   comment: {
      //     mutation: 'CREATED',
      //     data: newComment,
      //   },
      // });

      return commentTemp;

      return ({} as unknown as any);
    }

    ,
  },
  Comment: {
    author: (parent, args, { db }) => {
      const result = db.users.find(({ id }: UserDataType) => id === (<unknown>parent as CommentsDataType).author);
      return result as User;
    },
    post: (parent, args, { db }) => {
      const result = db.posts.find(({ comments }: PostDataType) => comments.includes((<unknown>parent as CommentsDataType).id));
      return result as Post;
    },
  },
};

export default comment;
