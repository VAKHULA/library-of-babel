import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Header } from '@/components/Header';
import { Paginator } from '@/components/Paginator';
import { RandomPageButton } from '@/components/RandomPageButton';
import { getNumberOfPermutations } from '@/utils/getNumberOfPermutations';
import { generatePage } from '@/utils/converter';
import { getDictionary } from '@/i18n/get-dictionary';
import { appConfig } from '@/app/[lang]/appConfig';

type Params = Promise<{
  lang: 'en' | 'ua';
}>;

type SearchParams = Promise<{
  page: string | undefined;
  search: string | undefined;
}>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { page = '0', search = '' } = await props.searchParams;
  const { lang } = await props.params;
  const dictionary = await getDictionary(lang);
  const pageNum = BigInt(page);
  const maxPageNum =
    getNumberOfPermutations(
      appConfig.characterSet[lang].length,
      appConfig.pageLength,
    ) - BigInt(1);

  if (pageNum > maxPageNum) {
    redirect(`/${lang}/page?page=${maxPageNum}`);
  } else if (pageNum < BigInt(0)) {
    redirect(`/${lang}/page?page=0`);
  }

  let pageText = generatePage(
    page,
    appConfig.characterSet[lang],
    appConfig.pageLength,
  );

  if (search) {
    pageText = pageText.replaceAll(search, `<mark>${search}</mark>`);
  }

  pageText = pageText.replaceAll(' ', '&nbsp;');

  return (
    <main>
      <div className='container'>
        <Header>
          <Link href={`/${lang}`} role='button' className='outline'>
            {dictionary.home_button}
          </Link>
          <RandomPageButton
            lang={lang}
            randomPageLabel={dictionary.rundom_page_button}
          />
        </Header>
        <article>
          <header className='page-header'>
            <Paginator
              page={pageNum}
              lang={lang}
              goButtonLabel={dictionary.go_button}
            />
          </header>
          <p
            className='page-preview'
            dangerouslySetInnerHTML={{
              __html: pageText,
            }}
          />
          <footer className='page-footer'>
            <Paginator
              page={pageNum}
              lang={lang}
              goButtonLabel={dictionary.go_button}
            />
          </footer>
        </article>
      </div>
    </main>
  );
}
