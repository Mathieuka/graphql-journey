import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import db, { DB } from './db';
import { prisma } from '../prisma/client';

export interface Context {
  db: DB
  pubsub: PubSub
  prisma: PrismaClient
}

const pubsub = new PubSub();

export const context: Context = { db, pubsub, prisma };
