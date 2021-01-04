import { Route, Switch } from 'react-router-dom';
import WelcomePage from './welcome-page';
import { WelcomeContextPage } from './welcome-page/WelcomePage';

export function Routes() {
  return (
    <Switch>
      <Route path="/context" component={WelcomeContextPage} />
      <Route path="/" component={WelcomePage} />
    </Switch>
  );
}
