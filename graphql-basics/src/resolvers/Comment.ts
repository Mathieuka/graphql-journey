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
    createComment: async (parent, { comment: { body, post, author } }, { db, pubsub }, info) => {
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

      if (postExist) {
        // enrich the concerned post with the new comment on database
        const commentedPost = db.posts.find(({ id: postId }: { id: string }) => postId === post);
        commentedPost.comments.push(id);

        // enrich comments table with the new comment on database
        db.comments.push(newComment);
      }
      pubsub.publish(`comment ${post}`, {
        comment: {
          mutation: 'CREATED',
          data: newComment,
        },
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
      const result = db.posts.find(({ comments }: PostDataType) => comments.includes((<unknown>parent as CommentsDataType).id));
      return result as Post;
    },
  },
};

export default comment;
