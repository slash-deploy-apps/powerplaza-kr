import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { env } from '~/env';
import { db } from '~/server/db';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? 3000}`,
  ],
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? 3000}`}/api/auth/callback/github`,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
