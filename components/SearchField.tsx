'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TextareaAutosize from 'react-textarea-autosize'

import { clearString } from '@/utils/clearString'
import { getNumberOfPermutations } from '@/utils/getNumberOfPermutations'
import { getRandomBigInt } from '@/utils/getRandomBigInt'
import { formatBigIntToShortHTML } from '@/utils/formatBigIntToShortHTML'
import { search } from '@/utils/converter'
import { appConfig } from '@/appConfig'

export const SearchField = ({
  initialValue = '',
  description,
  // buttonText,
  placeholder,
  lang
}: {
  initialValue: string
  description: React.ReactNode
  // buttonText: string
  placeholder: string
  lang: 'en' | 'ua'
}) => {
  // const router = useRouter()
  const [searchValue, setSearch] = useState<string>(initialValue)

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if (search) {
    //   const {page} = machine.search(search)
    //   router.push(`/page?page=${page}`) // &search=${encodeURIComponent(search)}
    // } else {
    //   router.push(`/`)
    // }
  }

  const matchesCount = getNumberOfPermutations(appConfig.characterSet[lang].length + 1, 3200 - search.length)
  const firstMatch = search(searchValue, appConfig.characterSet[lang])
  const lastMatch = search(searchValue.padEnd(3200, '.'), appConfig.characterSet[lang])
  const clearMatch = search(searchValue.padEnd(3200, ' '), appConfig.characterSet[lang])

  return (
    <div className='search-field'>
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
          name="search"
          placeholder={placeholder}
          minRows={3}
          value={searchValue}
          onChange={(e) => {
            const value = clearString(appConfig.characterSet[lang], e.target.value.toLowerCase()).slice(0, 3201)
            setSearch(value)
          }}
        />
        <div className='search-field__buttons'>
          <p>
            {description}
          </p>
          {/* <input type="submit" value={buttonText} /> */}
        </div>
      </form>
      <hr />
      <p>
        found <span dangerouslySetInnerHTML={{ __html: formatBigIntToShortHTML(matchesCount) }}></span> pages
      </p>
      <div className='links_block'>
        <Link
          role='button'
          className='outline'
          href={`/${lang}/page?page=0`}
        >
          first page
        </Link>
        <Link role='button' className='outline' href={`/${lang}/page?page=${getRandomBigInt(6000).toString()}`}>
          random page
        </Link>
        <Link
          role='button'
          className='outline'
          href={`/${lang}/page?page=${getNumberOfPermutations(appConfig.characterSet[lang].length, 3200) - BigInt(1)}`}
        >
          last page
        </Link>
        {searchValue &&
          <>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${firstMatch}`}
            >
              first match
            </Link>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${lastMatch}`}
            >
              lastMatch
            </Link>
            <Link
              role='button'
              className='outline'
              href={`/${lang}/page?page=${clearMatch}`}
            >
              clearMatch
            </Link>
          </>
        }
      </div>
    </div>
  )
}
