import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@coma/database', '@coma/types'],
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl(nextConfig);
