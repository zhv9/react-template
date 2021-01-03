import React from 'react';
import intl from 'react-intl-universal';
import { NativeSelect } from '../../components/selector';
import { SupportLocales } from '../../intl';

export function SelectLanguage() {
  const options: { label: string; value: string }[] = SupportLocales.map(({ name, value }) => ({ label: name, value }));
  const currentLocale = intl.getInitOptions().currentLocale;
  const selected = options.find(({ value }) => value === currentLocale);
  function onSelected(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
  return <NativeSelect id="language" name="language" options={options} selected={selected} onSelected={onSelected} />;
}
