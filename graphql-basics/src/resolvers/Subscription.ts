import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from '../schema';

export const pubsub = new PubSub();

const subscription: Resolvers = {
  Subscription: {
    userCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['USER_CREATED']),
        (payload, variables) => (payload.userCreated.organization === variables.organization),
      ),
    },
  },
};

export default subscription;
