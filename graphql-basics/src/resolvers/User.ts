import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, UpdateUserInput, User,
} from '../schema';
import {
  CommentsDataType, DB, PostDataType, UserDataType,
} from '../db';

const removeUser = (id: string, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.users = [...db.users.filter((user) => user.id !== id)];
  setTimeout(() => resolve(console.log('[User removed]')), 1000);
});

const removeComment = (id: string, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.comments = [...db.comments.filter(({ author }) => author !== id)];
  setTimeout(() => resolve(console.log('[Comment removed]')), 1000);
});

const removePost = (id: string, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.posts = [...db.posts.filter(({ author }) => author !== id)];
  setTimeout(() => resolve(console.log('[Post removed]')), 1000);
});

const updateUser = (id: string, args: UpdateUserInput, db: DB) => new Promise((resolve) => {
  // eslint-disable-next-line no-param-reassign
  db.users = [...db.users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        age: args.age || user.age,
        email: args.email || user.email,
      };
    }
    return user;
  })];
  setTimeout(() => resolve(console.log('[User updated]')), 1000);
});

const user: Resolvers = {
  Query: {
    me: async (parent, args, { prisma }) => {
      const [me] = await prisma.user.findMany({
        where: {
          id: 10,
        },
      });
      if (!me) {
        throw new Error('no user found');
      }
      return me;
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
    createUser: async (parent, { user: { email, age, name } }, { db, pubsub }, info) => {
      const emailTaken = db.users.some(({ email: _email }: UserDataType) => _email === email);
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const newUser = {
        id: uuidv4(),
        organization: `${name}-org`,
        name,
        email,
        age: (age && Number(age)) || null,
        posts: [],
        comments: [],
      };
      await pubsub.publish('USER_CREATED', {
        userCreated: {
          mutation: 'CREATED',
          data: newUser,
        },
      });
      db.users.push(newUser);

      return newUser;
    },
    updateUser: async (parent, { id, args }, { db }: { db: DB }, info) => {
      const userExist = db.users.find(({ id: userId }) => userId === id);

      if (!userExist) {
        throw new Error('User not found');
      }
      if (args?.email) {
        const emailTaken = db.users.some(({ email }) => args.email === email);
        if (emailTaken) {
          throw new Error('Email already taken');
        }
      }
      await updateUser(id, args, db);
      const userUpdated = db.users.find(({ id: userId }) => userId === id);
      return userUpdated as unknown as User;
    },
    deleteUser: async (parent, { id }, { db }, info) => {
      const userToBeRemoved = db.users.find(({ id: userID }: UserDataType) => id === userID);
      if (!userToBeRemoved) {
        throw new Error('User not found');
      }
      await removeComment(userToBeRemoved.id, db);
      await removePost(userToBeRemoved.id, db);
      await removeUser(userToBeRemoved.id, db);
      return userToBeRemoved;
    },
  },
  User: {
    posts: async (parent, args, { db, prisma }) => {
      const posts = await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return posts;
    },
    comments: (parent, args, { db }) => {
      const result = db.comments.filter(({ author }: CommentsDataType) => author === parent.id);
      return result as unknown as Comment[];
    },
  },
};

export default user;
