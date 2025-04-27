import Link from 'next/link'

// import { notFound } from 'next/navigation'
import { SearchField } from '@/components/SearchField'
import { Header } from '@/components/Header'

type SearchParams = Promise<{ search: string | undefined }>

import StateMachine from '@/StateMachine'

export default async function SearchPage(props: {
  searchParams: SearchParams
}) {
  const { search = '' } = await props.searchParams


  const machine = new StateMachine()
  const {page} = machine.search(search)
  const {page:page2} = machine.search(search.padEnd(3200))

  return (
    <main className='container'>
      <Header>
      <Link className="outline" href={`/`} role='button'>
          Home
        </Link>
      </Header>
      <SearchField 
        initialValue={search}
        description={(
          <span>Enter up to 3200 characters,
            <br/>
            The library contains only lower-case letters, space, comma, and period.</span>
        )}
      />
      <article>
        <Link href={`/page?page=${page.toString()}&search=${encodeURIComponent(search)}`}>
          page1
        </Link>
        <br/>
        <Link href={`/page?page=${page2.toString()}&search=${encodeURIComponent(search)}`}>
          page2
        </Link>
      </article>
    </main>
  )
}
