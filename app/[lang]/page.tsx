import { Header } from '@/components/Header'
import { SearchField } from '@/components/SearchField'
import { GoToPageInput } from '@/components/GoToPageInput'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LangToggle } from '@/components/LangToggle'
import { appConfig } from "@/appConfig"
import { Locale } from "@/i18n-config"
import { getDictionary } from "@/get-dictionary"

export default async function HomePage(props: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await props.params
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <div className='container'>
      <Header>
        <LangToggle />
        <ThemeToggle />
      </Header>
      <article>
        <header>
          <h1>{dictionary.title}</h1>
        </header>
        <SearchField
          placeholder={dictionary.search_placeholder}
          initialValue={''}
          description={(
            <span
              dangerouslySetInnerHTML={{
                __html: `${dictionary.search_description.replace('$count', appConfig.pageLength.toString())}<br/>(<ins>${appConfig.characterSet[lang]}</ins>)`
              }}
             />
          )}
          lang={lang}
        />
      </article>
      <article>
        <header>
          {dictionary.pager_title}
        </header>
        <GoToPageInput lang={lang} />
      </article>
      <article>
        <header>
          About this site
        </header>
        <p>
          The site itself is a simplified recreation of <a href='https://libraryofbabel.info/' target='_blanc'>Library of Babel</a> which is a recreation of a short story <a href='https://en.wikipedia.org/wiki/The_Library_of_Babel' target='_blanc'>The Library of Babel by Jorge Luis Borges.</a><br/>
          The essence of this book is that it contains every possible combination (permutation) of the characters in a language.
          Book contains all possible pages of 3200 characters so any text page that is written and will be ever written already exists within this book like song, poem, news and even your conversation with ChatGPT.<br/>
          Inspired by <a href='https://libraryofbabel.info/' target='_blanc'>Library of Babel</a>.
        </p>
        <footer>
          <a href='https://github.com/VAKHULA/library-of-babel' title='Code on Github'>Code on Github</a>
        </footer>
      </article>
      </div>
    </main>
  )
}
