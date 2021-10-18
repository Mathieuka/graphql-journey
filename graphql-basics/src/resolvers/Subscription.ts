import { withFilter } from 'graphql-subscriptions';
import { Resolvers } from '../schema';
import { DB } from '../db';

const subscription: Resolvers = {
  Subscription: {
    userCreated: {
      subscribe: withFilter(
        (parent, args, { pubsub }, info) => pubsub.asyncIterator(['USER_CREATED']),
        (payload, variables) => (payload.userCreated.data.organization === variables.organization),
      ),
    },
    count: {
      subscribe: (parent, args, { pubsub }, info) => {
        let count = 0;

        setInterval(() => {
          count += 1;
          pubsub.publish('count', {
            count,
          });
        }, 2000);

        return pubsub.asyncIterator('count');
      },
    },
    comment: {
      subscribe: (parent, { postId }, { pubsub, db }, info) => {
        const post = (db as DB).posts.find(({ id, published }) => postId === id && published);

        if (!post) {
          throw new Error('Post not founded');
        }
        return pubsub.asyncIterator(`comment ${postId}`);
      },
    },
    post: {
      subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator(['POST']),
    },
  },
};

export default subscription;
