'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';

import { clearString } from '@/utils/clearString';
import { getNumberOfPermutations } from '@/utils/getNumberOfPermutations';
import { formatBigIntToShortHTML } from '@/utils/formatBigIntToShortHTML';
import { search } from '@/utils/converter';
import { appConfig } from '@/app/[lang]/appConfig';
import { i18n } from '@/i18n/i18n';

export const SearchField = ({
  initialValue = '',
  lang,
}: {
  initialValue: string;
  lang: 'en' | 'ua';
  }) => {
  const router = useRouter()
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
          placeholder={i18n.t('search_placeholder', {}, lang)}
          minRows={3}
          value={searchValue}
          onChange={(e) => {
            const value = clearString(
              appConfig.characterSet[lang],
              e.target.value.toLowerCase(),
            ).slice(0, appConfig.pageLength);
            setSearch(value);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              router.push(searchValue
              ? `/${lang}/page?page=${lastMatch}&search=${encodeURIComponent(searchValue)}`
              : `/${lang}/page?page=0`)
            }
          }}
        />
        <div className='search-field__buttons'>
          <p>
            <span
              dangerouslySetInnerHTML={{
                __html: `
                  ${i18n.t('search_description', { text: appConfig.pageLength.toString() }, lang)}<br/>
                  (<ins>${appConfig.characterSet[lang]}</ins>)
                `,
              }}
            />
          </p>
        </div>
      </form>
      <hr />
      <p
        dangerouslySetInnerHTML={{
          __html: i18n.t(
            'found_pages',
            { text: formatBigIntToShortHTML(matchesCount) },
            lang,
          ),
        }}
      />
      <div className='links_block'>
        <Link
          role='button'
          className={searchValue ? `outline` : `outline secondary`}
          href={searchValue ? `/${lang}/page?page=${firstMatch}` : ''}
        >
          {i18n.t('first_match_button', {}, lang)}
        </Link>
        <Link
          role='button'
          className={searchValue ? `outline` : `outline secondary`}
          href={
            searchValue
              ? `/${lang}/page?page=${lastMatch}&search=${encodeURIComponent(searchValue)}`
              : ''
          }
        >
          {i18n.t('last_match_button', {}, lang)}
        </Link>
        <Link
          role='button'
          className={searchValue ? `outline` : `outline secondary`}
          href={
            searchValue
              ? `/${lang}/page?page=${clearMatch}&search=${encodeURIComponent(searchValue)}`
              : ''
          }
        >
          {i18n.t('clear_match_button', {}, lang)}
        </Link>
      </div>
    </div>
  );
};
