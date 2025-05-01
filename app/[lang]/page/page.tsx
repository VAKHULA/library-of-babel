import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Header } from '@/components/Header'
import { Paginator } from '@/components/Paginator'
import { getRandomBigInt } from '@/utils/getRandomBigInt'
import { generatePage } from '@/utils/converter'
import { appConfig } from "@/appConfig"

type Params = Promise<{
  lang: 'en' | 'ua'
}>

type SearchParams = Promise<{
  page: string | undefined
  search: string | undefined
}>

export default async function Page(props: {
  params: Params,
  searchParams: SearchParams
}) {
  const { page, search = '' } = await props.searchParams
  const { lang } = await props.params

  if (!page) {
    notFound()
  }

  const pageNum = BigInt(page)

  return (
    <main>
      <div className='container'>
      <Header>
        <Link href={`/${lang}`} role='button' className="outline">
          home
        </Link>
        <Link role='button' className='outline' href={`/${lang}/page?page=${getRandomBigInt(6000).toString()}`}>
          random page
        </Link>
      </Header>
      <article>
        <header className='page-header'>
          <Paginator page={pageNum} lang={lang} />
        </header>
        <p
          className='page-preview'
          dangerouslySetInnerHTML={{
            __html: generatePage(page, appConfig.characterSet[lang], appConfig.pageLength)
              .replaceAll(search, `<mark>${search}</mark>`)
              .replaceAll(' ', '&nbsp;')
              // .replace(/ /g, '<span class="_m _spc">&middot;</span>')
              // .replaceAll(' ', '&#32;')
              // .replaceAll('\n', '<br/>')
          }}
        />
        <footer className='page-footer'>
          <Paginator page={pageNum} lang={lang} />
        </footer>
      </article>
      </div>
    </main>
  )
}
