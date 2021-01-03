import React from 'react';
import { IntlProvider } from '../../intl';
import ReactInfo from './ReactInfo';
import { SelectLanguage } from './SelectLanguage';

export function WelcomePage() {
  return (
    <>
      <IntlProvider>
        <SelectLanguage />
        <ReactInfo />
      </IntlProvider>
    </>
  );
}
