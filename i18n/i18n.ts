import rosetta from 'rosetta';

import enDictionary from './dictionaries/en.json';
import uaDictionary from './dictionaries/ua.json';

const BCP47LanguageTags = {
  en: 'en-US',
  ua: 'uk-UA',
} as const;

const rosettaInstance = rosetta({
  en: enDictionary,
  ua: uaDictionary,
});

// set default language
rosettaInstance.locale('en');

const t = (
  translationKey: string,
  params: { count?: number; text?: string; feminine?: boolean },
  languageKey: keyof typeof BCP47LanguageTags,
) => {
  if (typeof params.count === 'number') {
    const PR = new Intl.PluralRules(BCP47LanguageTags[languageKey]);
    return rosettaInstance
      .t(`${translationKey}.${PR.select(params.count)}`, params, languageKey)
      .replaceAll('$text', params?.text || '');
  } else if (typeof params.feminine === 'boolean') {
    return rosettaInstance.t(
      `${translationKey}.${params.feminine ? 'feminine' : 'masculine'}`,
      params,
      languageKey,
    );
  } else if (typeof params.text === 'string') {
    return rosettaInstance
      .t(translationKey, params, languageKey)
      .replaceAll('$text', params.text);
  } else {
    return rosettaInstance.t(translationKey, params, languageKey);
  }
};

export const i18n = { t: t };
// https://www.unicode.org/cldr/charts/43/supplemental/language_plural_rules.html

// t('tree', { count: 0 }, 'en')
// t('tree', { count: 1 }, 'en')
// t('tree', { count: 2 }, 'en')

// t('tree', { count: 0 }, 'ua')
// t('tree', { count: 1 }, 'ua')
// t('tree', { count: 2 }, 'ua')
// t('tree', { count: 5 }, 'ua')
// t('tree', { count: 21 }, 'ua')
// https://partnerhub.warnermediagroup.com/metadata/languages
// const PR = new Intl.PluralRules('en-US');  // 'en-US' - BCP-47 Language Tags
// console.log(PR.select(0))
// console.log(PR.select(1))
// console.log(PR.select(2))
// console.log(PR.select(3))
// console.log(PR.select(4))
// console.log(PR.select(5))
// console.log('===')
// const PR2 = new Intl.PluralRules('uk-UA');
// console.log(PR2.select(0))
// console.log(PR2.select(1))
// console.log(PR2.select(2))
// console.log(PR2.select(3))
// console.log(PR2.select(4))
// console.log(PR2.select(5))

// "found_pages": {
//   "one": "found $text pages",
//   "other": "found $text pages"
// }

// one 1
// few 2
// many 5
// other 1.5
