import { PubSub } from 'graphql-subscriptions';
import { Resolvers } from '../schema';

export const pubsub = new PubSub();

const subscription: Resolvers = {
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
    },
  },
};

export default subscription;
