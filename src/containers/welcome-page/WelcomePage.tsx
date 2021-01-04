import React from 'react';
import { IntlSimpleProvider, IntlContextProvider } from '../../intl';
import ReactInfo from './ReactInfo';
import { SelectLanguageSimple, SelectLanguageByAction } from './SelectLanguage';

export function WelcomePage() {
  return (
    <>
      <IntlSimpleProvider>
        <SelectLanguageSimple />
        <ReactInfo />
      </IntlSimpleProvider>
    </>
  );
}

export function WelcomeContextPage() {
  return (
    <>
      <IntlContextProvider>
        <SelectLanguageByAction />
        <ReactInfo />
      </IntlContextProvider>
    </>
  );
}
