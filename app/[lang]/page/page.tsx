import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Header } from '@/components/Header'
import { Paginator } from '@/components/Paginator'
import { RandomPageButton } from '@/components/RandomPageButton'
import { generatePage } from '@/utils/converter'
import { getDictionary } from "@/get-dictionary"
import { appConfig } from "@/app/[lang]/appConfig"

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
  const { page } = await props.searchParams
  const { lang } = await props.params
  const dictionary = await getDictionary(lang)

  if (!page) {
    notFound()
  }

  const pageNum = BigInt(page)

  return (
    <main>
      <div className='container'>
      <Header>
        <Link href={`/${lang}`} role='button' className="outline">
          {dictionary.home_button}
        </Link>
        <RandomPageButton lang={lang} randomPageLabel={dictionary.rundom_page_button} />
      </Header>
      <article>
        <header className='page-header'>
          <Paginator page={pageNum} lang={lang} goButtonLabel={dictionary.go_button} />
        </header>
        <p
          className='page-preview'
          dangerouslySetInnerHTML={{
            __html: generatePage(page, appConfig.characterSet[lang], appConfig.pageLength)
              // .replaceAll(search, `<mark>${search}</mark>`)
              .replaceAll(' ', '&nbsp;')
              // .replace(/ /g, '<span class="_m _spc">&middot;</span>')
              // .replaceAll(' ', '&#32;')
              // .replaceAll('\n', '<br/>')
          }}
        />
        <footer className='page-footer'>
          <Paginator page={pageNum} lang={lang} goButtonLabel={dictionary.go_button} />
        </footer>
      </article>
      </div>
    </main>
  )
}
