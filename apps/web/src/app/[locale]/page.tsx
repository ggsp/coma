import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-6xl font-bold mb-4">{t('appName')}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {t('appDescription')}
        </p>
        <div className="text-lg text-muted-foreground">
          <p className="mb-4">
            Discover what has been researched, funded, and learned — and
            connect with the people behind it.
          </p>
          <p className="mt-8 text-sm">
            Development environment is ready! 🚀
          </p>
        </div>
      </div>
    </main>
  );
}
