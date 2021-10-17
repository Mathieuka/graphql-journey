import { withFilter } from 'graphql-subscriptions';
import { Resolvers } from '../schema';

const subscription: Resolvers = {
  Subscription: {
    userCreated: {
      subscribe: withFilter(
        (parent, args, { pubsub }, info) => pubsub.asyncIterator(['USER_CREATED']),
        (payload, variables) => (payload.userCreated.organization === variables.organization),
      ),
    },
    count: {
      subscribe(parent, args, { pubsub }, info) {
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
  },
};

export default subscription;
