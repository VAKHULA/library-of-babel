'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { getRandomBigInt } from '@/utils/getRandomBigInt';

export const RandomPageButton = ({
  lang,
  randomPageLabel,
}: {
  lang: string;
  randomPageLabel: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      role='button'
      className='outline'
      href={
        isClient ? `/${lang}/page?page=${getRandomBigInt(4679).toString()}` : ''
      }
    >
      {randomPageLabel}
    </Link>
  );
};
