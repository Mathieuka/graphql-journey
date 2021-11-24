import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { prisma } from '../prisma/client';

export interface Context {
  prisma: PrismaClient
}

export const pubsub = new PubSub();

export const context: Context = { prisma };
