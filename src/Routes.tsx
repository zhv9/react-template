import { Route, Switch } from 'react-router-dom';
import ReactInfo from './containers/welcome-page/ReactInfo';

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={ReactInfo} />
    </Switch>
  );
}
