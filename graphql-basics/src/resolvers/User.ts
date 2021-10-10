import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { CommentsDataType, PostDataType, UserDataType } from '../db';

const user: Resolvers = {
  Query: {
    me: (parent, args, { db }) => db.users[0],
    users: (parent, { range: rangeID }, { db }) => {
      if (!rangeID) return db.users;
      const { min, max } = rangeID;
      const result = db.users.filter(({ id }: UserDataType) => Number(id) >= min && Number(id) <= max);
      return result as User[];
    },
  },
  Mutation: {
    createUser: (parent, { user: { email, age, name } }, { db }, info) => {
      const emailTaken = db.users.some(({ email: _email }: UserDataType) => _email === email);
      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const newUser = {
        id: uuidv4(),
        name,
        email,
        age: (age && Number(age)) || null,
        posts: [],
        comments: [],
      };

      db.users.push(newUser);

      return newUser;
    },
    deleteUser: async (parent, { id }, { db }, info) => {
      const userToBeRemoved = db.users.find(({ id: userID }: UserDataType) => id === userID);
      if (!userToBeRemoved) {
        throw new Error('User not found');
      }
      await db.removeComment(userToBeRemoved.id);
      await db.removePost(userToBeRemoved.id);
      await db.removeUser(userToBeRemoved.id);
      return userToBeRemoved;
    },
  },
  User: {
    posts: (parent, args, { db }) => {
      const result = db.posts.filter(({ author }: PostDataType) => author === parent.id);
      return result as unknown as Post[];
    },
    comments: (parent, args, { db }) => {
      const result = db.comments.filter(({ author }: CommentsDataType) => author === parent.id);
      return result as unknown as Comment[];
    },
  },
};

export default user;
