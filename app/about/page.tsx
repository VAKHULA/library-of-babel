import Link from 'next/link'

import { Header } from '@/components/Header'

export default async function AboutPage() {
  return (
    <main className='container'>
      <Header>
      <Link href={`/`} role='button' className="outline">
          home
        </Link>
      </Header>
      <article>About</article>
    </main>
  )
}
