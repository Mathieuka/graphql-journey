import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { Context, pubsub } from '../context';

const user: Resolvers = {
  Query: {
    me: async (parent, args, { prisma }: Context) => {
      const [me] = await prisma.user.findMany({
        where: {
          id: 1,
        },
      });
      if (!me) {
        throw new Error('no user found');
      }
      return me as User;
    },
    users: async (parent, args, { prisma }) => {
      const users = await prisma.user.findMany();
      if (!users.length) {
        throw new Error('no user found');
      }
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, { user: { email, age, name } }, { prisma }: Context, info) => {
      const emailTaken = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          age,
          organization: `${name}-org`,
        },
      });
      if (!newUser) {
        throw new Error('User not created');
      }
      await pubsub.publish('USER_CREATED', {
        userCreated: {
          mutation: 'CREATED',
          data: newUser,
        },
      });
      return newUser as User;
    },
    updateUser: async (parent, { id, args }, { prisma }: Context, info) => {
      const emailTaken = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      try {
        const userUpdated = await prisma.user.update({
          where: {
            id,
          },
          data: {
            age: args.age,
            email: args.email,
          },
        });
        return userUpdated as unknown as User;
      } catch (error) {
        throw new Error('Record to update not found');
      }
    },
    deleteUser: async (parent, { id }, { prisma }: Context, info) => {
      // get all posts of the user
      const postsOfTheUser = await prisma.post.findMany({
        where: {
          authorId: id,
        },
      });

      const idsLinkedToThePostOfTheUser = postsOfTheUser.map(({ id: postId }) => ({ postId }));
      // remove each `Comment` linked to the user
      // remove each `Comment` linked to the `Post` of the user
      const commentariesDeleted = await prisma.comment.deleteMany({
        where: {
          OR: [...idsLinkedToThePostOfTheUser, { authorId: id }],
        },
      });
      console.log('[Quantity of commentaries deleted] ', commentariesDeleted);

      // remove all `Post` of the user
      const postDeleted = await prisma.post.deleteMany({
        where: {
          authorId: id,
        },
      });
      console.log('[Quantity of posts deleted] ', postDeleted);

      // remove the user
      const userDeleted = await prisma.user.delete({
        where: {
          id,
        },
      });
      console.log('[User deleted] ', userDeleted);
      return userDeleted as unknown as User;
    },
  },
  User: {
    posts: async (parent, args, { prisma }: Context) => {
      const posts = await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return posts as unknown as Post[];
    },
    comments: async (parent, args, { prisma }: Context) => {
      const comments = await prisma.comment.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return comments as unknown as Comment[];
    },
  },
};

export default user;
