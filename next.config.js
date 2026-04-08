/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
  allowedDevOrigins: ['3001-iefnxvsruubzpl92jm8ce.e2b.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cloudbf.com',
      },
      {
        protocol: 'https',
        hostname: 'volkerpower.com',
      },
    ],
  },
};

export default config;
