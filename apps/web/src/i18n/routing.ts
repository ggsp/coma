import { createNavigation } from 'next-intl/navigation';

export const routing = {
  locales: ['en', 'de'] as const,
  defaultLocale: 'en' as const,
};

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing);
