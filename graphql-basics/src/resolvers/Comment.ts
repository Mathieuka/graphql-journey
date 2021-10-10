import { v4 as uuidv4 } from 'uuid';
import {
  Comment, Post, Resolvers, User,
} from '../schema';
import { CommentsDataType, PostDataType, UserDataType } from '../db';

const comment: Resolvers = {
  Query: {
    comments: (parent, args, { db }) => db.comments,
  },
  Mutation: {
    createComment: (parent, { comment: { body, post, author } }, { db }, info) => {
      const userExist = db.users.some(({ id }: UserDataType) => id === author);
      const postExist = db.posts.some(({ id, published }: PostDataType) => id === post && published);
      if (!userExist) throw new Error('User not found');
      if (!postExist) throw new Error('Post not found');

      const id = uuidv4();
      const newComment: CommentsDataType = {
        id,
        body,
        author,
        post,
      };

      // enrich comments list with the new comment
      db.comments.push(newComment);

      // enrich the posts with the new comment
      (db.posts as PostDataType[]).forEach((_post) => {
        if (_post.id === post) {
          _post.comments.push(id);
        }
      });

      return newComment as unknown as Comment;
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
};

export default comment;
