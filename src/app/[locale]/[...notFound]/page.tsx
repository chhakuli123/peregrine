import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations('NotFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-card/50 backdrop-blur-sm text-primary-foreground">
      <h1 className="mb-4 text-6xl font-bold text-white">{t('404')} </h1>
      <p className="mb-4 text-xl text-white"> {t(`dosen't_exist_text`)} </p>
      <Link
        href="/"
        className="mt-4 rounded-lg px-6 py-3 transition duration-300 bg-primary text-primary-foreground shadow hover:bg-primary/90 "
      >
        {t('go_to_home')}
      </Link>
    </div>
  );
};

export default NotFound;
