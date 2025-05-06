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
          randomPageLabel={dictionary.rundom_page_button}
          firstPageButtonLabel={dictionary.first_page_button}
          lastPageButtonLabel={dictionary.last_page_button}
          firstMatchButtonLabel={dictionary.first_match_button}
          lastMatchButtonLabel={dictionary.last_match_button}
          clearMatchButtonLabel={dictionary.clear_match_button}
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
        <GoToPageInput lang={lang} goButtonLabel={dictionary.go_button} />
      </article>
      <article>
        <header>
          {dictionary.about_title}
        </header>
        <p
          dangerouslySetInnerHTML={{
            __html: dictionary.about_text
          }}
        />
        <footer>
          <a href='https://github.com/VAKHULA/library-of-babel' title='Code on Github'>Code on Github</a>
        </footer>
      </article>
      </div>
    </main>
  )
}
