import { Route, Switch } from 'react-router-dom';
import WelcomePage from './welcome-page';

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
    </Switch>
  );
}
