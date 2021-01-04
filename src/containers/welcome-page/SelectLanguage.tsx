import React from 'react';
import intl from 'react-intl-universal';
import { NativeSelect } from '../../components/selector';
import { LocaleKey, SupportLocales, useIntlDispatch, setLocale } from '../../intl';

function useSelectLanguageData(onSelected: (lang: string) => void): JSX.Element {
  const options: { label: string; value: string }[] = SupportLocales.map(({ name, value }) => ({ label: name, value }));
  const currentLocale = intl.getInitOptions().currentLocale;
  const selected = options.find(({ value }) => value === currentLocale);
  return <NativeSelect id="language" name="language" options={options} selected={selected} onSelected={onSelected} />;
}

export function SelectLanguageSimple() {
  function onSelected(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
  return useSelectLanguageData(onSelected);
}

export function SelectLanguageByAction() {
  const dispatch = useIntlDispatch();
  function onSelected(lang: string) {
    localStorage.setItem('lang', lang);
    setLocale(dispatch, lang as LocaleKey);
  }
  return useSelectLanguageData(onSelected);
}
