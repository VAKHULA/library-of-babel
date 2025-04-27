import Link from 'next/link'

import { Header } from '@/components/Header'
import StateMachine from '@/StateMachine'

const machine = new StateMachine()

export default async function RandomPage() {
  return (
    <main className='container'>
      <Header>
        
        <Link href={`/`} role='button' className="outline">
        home
        </Link>
        <a 
        // href='javascript:window.location.reload()' 
        // onClick={()=>{window.location.reload()}} 
        role='button' className="outline">
          Refresh
        </a>
      </Header>
      <article>{machine.generatePage(Math.floor(Math.random() * 100000000000000))}</article>
    </main>
  )
}
