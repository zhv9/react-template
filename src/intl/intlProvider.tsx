import axios from 'axios';
import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { LocaleKey } from './config';

interface Intl {
  get(key: IntlKey, variables?: any): string;
  getHTML(key: IntlKey, value?: any): string;
}

export function useIntl(): Intl {
  return intl;
}

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export function IntlProvider({ children }: Props) {
  const currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    localStorageLocaleKey: 'lang',
  }) as LocaleKey;
  const [locale, setLocale] = useState<LocaleKey>();

  useEffect(() => {
    axios.get(`locales/${currentLocale}.json`).then((res) => {
      return intl
        .init({
          currentLocale,
          locales: {
            [currentLocale]: res.data,
          },
        })
        .then(() => setLocale(currentLocale));
    });
  }, [currentLocale]);

  return <>{locale ? children : null}</>;
}
