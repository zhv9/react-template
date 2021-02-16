import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { INTL_KEY, TODO_STORE } from '../config';
import { todoReducer } from '../containers/todo_app';
import { intlReducer, IntlStore } from '../intl';

export type RootStore = {
  [INTL_KEY]: IntlStore;
  [TODO_STORE]: TodoStore;
};

const rootStore = {
  [INTL_KEY]: intlReducer,
  [TODO_STORE]: todoReducer,
};

export const rootReducer = combineReducers(rootStore);

export const store = createStore(rootReducer, applyMiddleware(thunk));
