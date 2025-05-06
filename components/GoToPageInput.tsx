'use client'

import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { clearString } from '@/utils/clearString'

export const GoToPageInput = ({ lang, goButtonLabel }: { lang: string, goButtonLabel: string }) => {
  const [page, setPage] = useState<string>('0')
  return (
    <form action={`/${lang}/page`}>
      <TextareaAutosize
        name="page"
        placeholder='0'
        minRows={1}
        value={page}
        onChange={(e) => {
          const value = clearString('0123456789', e.target.value)
          setPage(value)
        }}
      />
      <div className='search-field__buttons'>
        <input type="submit" className='outline' value={goButtonLabel} />
      </div>
    </form>
  )
}