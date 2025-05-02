'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { getRandomBigInt } from '@/utils/getRandomBigInt'

export const RandomPageButton = ({lang}: {lang: string}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Link role='button' className='outline' href={isClient ? `/${lang}/page?page=${ getRandomBigInt(6000).toString()}` : ''}>
      Random Page
    </Link>
  )
}
