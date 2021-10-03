import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../../schema';
import {
  UserDataType, PostDataType, CommentsDataType, DB,
} from '../../db';

const blog: Resolvers = {
  Query: {
    me: (parent, args, { db }) => db.users[0],
    posts: (parent, args, { db }) => db.posts,
    users: (parent, { range: rangeID }, { db }) => {
      if (!rangeID) return db.users;
      const { min, max } = rangeID;
      const result = db.users.filter(({ id }: UserDataType) => Number(id) >= min && Number(id) <= max);
      return result as User[];
    },
    comments: (parent, args, { db }) => db.comments,
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
      const user = db.users.find(({ id: userID }: UserDataType) => id === userID);
      if (!user) {
        throw new Error('User not found');
      }
      await db.removeComment(user.id);
      await db.removePost(user.id);
      await db.removeUser(user.id);
      return user;
    },
    createPost: (parent, {
      post: {
        title, body, published, author,
      },
    }, { db }, info) => {
      const userExist = db.users.some(({ id }: UserDataType) => id === author);
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
      db.posts.push(post);
      return post as unknown as Post;
    },
    createComment: (parent, { comment: { body, post, author } }, { db }, info) => {
      const userExist = db.users.some(({ id }: UserDataType) => id === author);
      const postExist = db.posts.some(({ id, published }: PostDataType) => id === post && published);
      if (!userExist) throw new Error('User not found');
      if (!postExist) throw new Error('Post not found');

      const id = uuidv4();
      const comment: CommentsDataType = {
        id,
        body,
        author,
        post,
      };

      // enrich comments list with the new comment
      db.comments.push(comment);

      // enrich the posts with the new comment
      (db.posts as PostDataType[]).forEach((_post) => {
        if (_post.id === post) {
          _post.comments.push(id);
        }
      });

      return comment as unknown as Comment;
    },
  },
  Comment: {
    author: (parent, args, { db }) => {
      const result = db.users.find(({ id }: UserDataType) => id === (<unknown>parent as CommentsDataType).author);
      return result as User;
    },
    post: (parent, args, { db }) => {
      const result = db.posts.find(({ comments: _comments }: PostDataType) => _comments.includes((<unknown>parent as CommentsDataType).post));
      return result as Post;
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

export default blog;
