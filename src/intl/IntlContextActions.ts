import axios from 'axios';
import intl from 'react-intl-universal';
import { LocaleKey } from './config';
import { allContents } from './intlContents';
import { Dispatch, IntlStore } from './IntlContextProvider';

export const SET_LOCALE = Symbol('SET_LOCALE');

async function getLocale(currentLocale: LocaleKey): Promise<typeof allContents> {
  let currentLocaleData = allContents;
  try {
    currentLocaleData = (await axios.get(`locales/${currentLocale}.json`)).data;
  } catch (error) {
    console.warn(error);
  }
  return { ...allContents, ...currentLocaleData };
}

export function initIntl(currentLocale = LocaleKey.en_US, localesData: LocalesData = { 'en-US': allContents }) {
  intl.init({ currentLocale, locales: localesData });
  return intl;
}

export async function setLocale(dispatch: Dispatch, currentLocale: LocaleKey) {
  const currentLocaleData = await getLocale(currentLocale);
  await intl.init({
    currentLocale,
    locales: {
      [currentLocale]: currentLocaleData,
    },
  });
  dispatch({ type: SET_LOCALE });
}

export const setLocaleActionMap = {
  [SET_LOCALE]: (state: IntlStore) => {
    return Object.assign({}, state);
  },
};
