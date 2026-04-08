import { type Config } from 'drizzle-kit';

import { env } from '~/env';

export default {
  schema: './src/server/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ['nextjs-trpc-shadcn-better-sqlite-better-auth-boilerplate_*', 'powerplaza_*', 'user', 'account', 'session', 'verification', 'post'],
  verbose: true,
} satisfies Config;
