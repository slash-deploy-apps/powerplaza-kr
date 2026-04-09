import { createClient, type Client } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '~/env';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

const authToken = env.DATABASE_AUTH_TOKEN;
if (!authToken && env.DATABASE_URL.startsWith('libsql://')) {
  throw new Error(
    'DATABASE_AUTH_TOKEN is required when using Turso (libsql:// URL). Set it in your deployment environment variables.'
  );
}

export const client =
  globalForDb.client ?? createClient({ url: env.DATABASE_URL, authToken });
if (env.NODE_ENV !== 'production') globalForDb.client = client;

export const db = drizzle(client, { schema });
