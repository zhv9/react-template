import React from 'react';
import { IntlSimpleProvider, IntlContextProvider } from '../../intl';
import ReactInfo from './react_info';
import { SelectLanguageSimple, SelectLanguageByAction } from './select_language';

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
