import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Header } from '@/components/Header';
import { Paginator } from '@/components/Paginator';
import { RandomPageButton } from '@/components/RandomPageButton';
import { getNumberOfPermutations } from '@/utils/getNumberOfPermutations';
import { generatePage } from '@/utils/converter';
import { appConfig } from '@/app/[lang]/appConfig';
import { i18n } from '@/i18n/i18n';

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
            {i18n.t('home_button', {}, lang)}
          </Link>
          <RandomPageButton
            lang={lang}
            randomPageLabel={i18n.t('rundom_page_button', {}, lang)}
          />
        </Header>
        <article>
          <header className='page-header'>
            <Paginator
              page={pageNum}
              lang={lang}
              goButtonLabel={i18n.t('go_button', {}, lang)}
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
              goButtonLabel={i18n.t('go_button', {}, lang)}
            />
          </footer>
        </article>
      </div>
    </main>
  );
}
