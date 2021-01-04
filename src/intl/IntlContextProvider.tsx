import React from 'react';
import intl from 'react-intl-universal';
import { useCurrentLocale } from './intlSimpleProvider';
import { initIntl, setLocaleActionMap, SET_LOCALE } from './IntlContextActions';

const intlActionMap = {
  ...setLocaleActionMap,
};

const initIntlStore = {
  intl: initIntl(),
};

export function intlReducer(state: IntlStore = initIntlStore, action: Action) {
  return intlActionMap[action.type](state);
}

export type IntlStore = { intl: typeof intl };
type Action = { type: typeof SET_LOCALE };
export type Dispatch = (action: Action) => void;

type IntlProviderProps = { children: React.ReactNode };

const IntlStateContext = React.createContext<IntlStore | undefined>(undefined);
const IntlDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function IntlContextProvider({ children }: IntlProviderProps) {
  const [state, dispatch] = React.useReducer(intlReducer, initIntlStore);
  const locale = useCurrentLocale();
  return (
    <IntlStateContext.Provider value={state}>
      <IntlDispatchContext.Provider value={dispatch}>{locale ? children : null}</IntlDispatchContext.Provider>
    </IntlStateContext.Provider>
  );
}

function useIntlState() {
  const context = React.useContext(IntlStateContext);
  if (context === undefined) {
    throw new Error('useIntlState must be used within a IntlProvider');
  }
  return context;
}

function useIntlDispatch() {
  const context = React.useContext(IntlDispatchContext);
  if (context === undefined) {
    throw new Error('useIntlDispatch must be used within a IntlProvider');
  }
  return context;
}

export { IntlContextProvider, useIntlState, useIntlDispatch };
