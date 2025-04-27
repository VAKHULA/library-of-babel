import Link from 'next/link'

import { notFound } from 'next/navigation'

import { Header } from '@/components/Header'

type SearchParams = Promise<{ page: string | undefined }>
import StateMachine from '@/StateMachine'

const machine = new StateMachine()
export default async function Page(props: {
  searchParams: SearchParams
}) {
  const { page, search } = await props.searchParams

  if (!page) {
    notFound()
  }

  const pageNum = BigInt(page)

  return (
    <main className='container'>
      <Header>
      <Link href={`/`} role='button' className="outline">
      home
        </Link>
      </Header>
      <article>
        {/* <header>Page: {page}</header> */}
        {/* <pre>{machine.generatePage(page)}</pre> */}
        <p  
          className='page-preview'
          dangerouslySetInnerHTML={{
            __html:machine.generatePage(page)
              .replaceAll(search, `<strong>${search}</strong>`)
              .replaceAll(' ', '&nbsp;')
              .replaceAll('\n', '<br/>')
              
              
          }}
        />
        <footer className='page-footer'>
          <Link role='button' className='outline' href={`/page/?page=0`}>{`<<`}</Link>
          <Link role='button' className='outline' href={`/page/?page=${pageNum - BigInt(1)}`}>{`<`}</Link>
          <form>
  <fieldset role="group">
    <input name="page" type="number" placeholder="page" />
    <input type="submit" value="go" />
  </fieldset>
</form>
          <Link role='button' className='outline' href={`/page/?page=${pageNum + BigInt(1)}`}>{`>`}</Link>
          <Link role='button' className='outline' href={`/page/?page=95367431640624`}>{`>>`}</Link>
        </footer>
        </article>
    </main>
  )
}
// On most platforms, Chrome’s omnibox limits URL display to 32kB
// const size_t kMaxURLDisplayChars = 32 * 1024;