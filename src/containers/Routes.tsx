import { Route, Switch } from 'react-router-dom';
import { WelcomePage, WelcomeContextPage } from './welcome_page';

export function Routes() {
  return (
    <Switch>
      <Route path="/context" component={WelcomeContextPage} />
      <Route path="/" component={WelcomePage} />
    </Switch>
  );
}
