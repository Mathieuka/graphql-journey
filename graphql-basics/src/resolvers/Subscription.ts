import { withFilter } from 'graphql-subscriptions';
import { Resolvers } from '../schema';
import { Context, pubsub } from '../context';

const subscription: Resolvers = {
  Subscription: {
    userCreated: {
      subscribe: withFilter(
        (parent, args, nfo) => pubsub.asyncIterator(['USER_CREATED']),
        (payload, variables) => (payload.userCreated.data.organization === variables.organization),
      ),
    },
    count: {
      subscribe: (parent, args, info) => {
        let count = 0;

        setInterval(async () => {
          count += 1;
          await pubsub.publish('count', {
            count,
          });
        }, 2000);

        return pubsub.asyncIterator('count');
      },
    },
    comment: {
      subscribe: async (parent, { postId }, { prisma }: Context, info) => {
        if (prisma) {
          const post = await prisma.post.findMany({
            where: {
              id: postId,
            },
          });

          if (!post) {
            throw new Error('Post not founded');
          }
        }
        return pubsub.asyncIterator(`comment ${postId}`);
      },
    },
    post: {
      subscribe: (parent, args, info) => pubsub.asyncIterator('POST'),
    },
  },
};

export default subscription;
