'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TextareaAutosize from 'react-textarea-autosize';

import { RandomPageButton } from '@/components/RandomPageButton';
import { clearString } from '@/utils/clearString';
import { getNumberOfPermutations } from '@/utils/getNumberOfPermutations';
import { formatBigIntToShortHTML } from '@/utils/formatBigIntToShortHTML';
import { search } from '@/utils/converter';
import { appConfig } from '@/app/[lang]/appConfig';

export const SearchField = ({
  initialValue = '',
  description,
  placeholder,
  randomPageLabel,
  firstPageButtonLabel,
  lastPageButtonLabel,
  firstMatchButtonLabel,
  lastMatchButtonLabel,
  clearMatchButtonLabel,
  lang,
}: {
  initialValue: string;
  description: React.ReactNode;
  placeholder: string;
  randomPageLabel: string;
  firstPageButtonLabel: string;
  lastPageButtonLabel: string;
  firstMatchButtonLabel: string;
  lastMatchButtonLabel: string;
  clearMatchButtonLabel: string;
  lang: 'en' | 'ua';
}) => {
  const [searchValue, setSearch] = useState<string>(initialValue);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const matchesCount = searchValue
    ? getNumberOfPermutations(
        appConfig.characterSet[lang].length + 1,
        appConfig.pageLength - searchValue.length,
      )
    : getNumberOfPermutations(
        appConfig.characterSet[lang].length,
        appConfig.pageLength,
      );
  const firstMatch = search(searchValue, appConfig.characterSet[lang]);
  const lastMatch = search(
    searchValue.padEnd(appConfig.pageLength, '.'),
    appConfig.characterSet[lang],
  );
  const clearMatch = search(
    searchValue.padEnd(appConfig.pageLength, ' '),
    appConfig.characterSet[lang],
  );

  return (
    <div className='search-field'>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
          name='search'
          placeholder={placeholder}
          minRows={3}
          value={searchValue}
          onChange={(e) => {
            const value = clearString(
              appConfig.characterSet[lang],
              e.target.value.toLowerCase(),
            ).slice(0, appConfig.pageLength + 1);
            setSearch(value);
          }}
        />
        <div className='search-field__buttons'>
          <p>{description}</p>
        </div>
      </form>
      <hr />
      <p>
        found{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: formatBigIntToShortHTML(matchesCount),
          }}
        ></span>{' '}
        pages
      </p>
      <div className='links_block'>
        <Link role='button' className='outline' href={`/${lang}/page?page=0`}>
          {firstPageButtonLabel}
        </Link>
        <RandomPageButton lang={lang} randomPageLabel={randomPageLabel} />
        <Link
          role='button'
          className='outline'
          href={`/${lang}/page?page=${getNumberOfPermutations(appConfig.characterSet[lang].length, appConfig.pageLength) - BigInt(1)}`}
        >
          {lastPageButtonLabel}
        </Link>
        {searchValue && (
          <>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${firstMatch}&search=${encodeURIComponent(searchValue)}`}
            >
              {firstMatchButtonLabel}
            </Link>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${lastMatch}&search=${encodeURIComponent(searchValue)}`}
            >
              {lastMatchButtonLabel}
            </Link>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${clearMatch}&search=${encodeURIComponent(searchValue)}`}
            >
              {clearMatchButtonLabel}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
