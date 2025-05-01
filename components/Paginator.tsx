import Link from 'next/link'

export const Paginator = ({ page, lang }: { page: bigint, lang: string }) => (
  <>
    <Link role='button' className='outline' href={`/${lang}/page/?page=${page / BigInt(10)}`}>
      {`/ 10`}
    </Link>
    <Link role='button' className='outline' href={`/${lang}/page/?page=${page - BigInt(1)}`}>
      {`- 1`}
    </Link>
    <form>
      <fieldset role="group">
        <input name="page" type="text" placeholder="page" defaultValue={page.toString()} />
        <input type="submit" value="go" />
      </fieldset>
    </form>
    <Link role='button' className='outline' href={`/${lang}/page/?page=${page + BigInt(1)}`}>
      {`+ 1`}
    </Link>
    <Link role='button' className='outline' href={`/${lang}/page/?page=${page * BigInt(10)}`}>
      {`* 10`}
    </Link>
  </>
)
