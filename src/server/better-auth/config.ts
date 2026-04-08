import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { env } from '~/env';
import { db } from '~/server/db';

export const auth = betterAuth({
  baseURL: 'https://3001-iefnxvsruubzpl92jm8ce.e2b.app',
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://3001-iefnxvsruubzpl92jm8ce.e2b.app',
  ],
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: 'https://3001-iefnxvsruubzpl92jm8ce.e2b.app/api/auth/callback/github',
    },
  },
});

export type Session = typeof auth.$Infer.Session;
