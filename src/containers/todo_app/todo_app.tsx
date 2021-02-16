import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { IntlSimpleProvider } from '../../intl';
import { store } from '../../store/reducers';
import { SelectLanguageSimple } from '../welcome_page/select_language';
import { Detail } from './detail';
import { SummaryList } from './summary_list';

export function TodoApp() {
  let { path } = useRouteMatch();
  return (
    <Provider store={store}>
      <IntlSimpleProvider>
        <SelectLanguageSimple />
        <div style={{ width: '30rem' }}>
          <Switch>
            <Route exact path={path} component={SummaryList} />
            <Route path={`${path}/detail`} component={Detail} />
          </Switch>
        </div>
      </IntlSimpleProvider>
    </Provider>
  );
}
