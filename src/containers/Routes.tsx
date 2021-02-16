import { Route, Switch } from 'react-router-dom';
import TodoApp from './todo_app';
import { WelcomePage, WelcomeContextPage } from './welcome_page';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/context" component={WelcomeContextPage} />
      <Route path="/todo" component={TodoApp} />
    </Switch>
  );
}
