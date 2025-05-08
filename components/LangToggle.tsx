'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';

import { type Locale } from '@/i18n/i18n-config';

export const LangToggle = () => {
  const pathname = usePathname();
  const params = useParams<{ lang: string }>();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div role='group'>
      <Link
        role='button'
        className={params.lang !== 'en' ? 'outline contrast' : 'outline'}
        href={redirectedPathname('en')}
      >
        English
      </Link>
      <Link
        role='button'
        className={params.lang !== 'ua' ? 'outline contrast' : 'outline'}
        href={redirectedPathname('ua')}
      >
        Українська
      </Link>
    </div>
  );
};
