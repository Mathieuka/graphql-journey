import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import db, { DB } from './db';
import { prisma } from '../prisma/client';

export interface Context {
  db: DB
  prisma: PrismaClient
}

export const pubsub = new PubSub();

export const context: Context = { db, prisma };
