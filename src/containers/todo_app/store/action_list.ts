import { RootStore } from '../../../store/reducers';
import * as Actions from './action_types';
import { getTodoStore } from './utils';

export function initSummary(): ITodo[] {
  return [];
}

export const summaryListReducerMap = {
  [Actions.SET_LIST]: (store: TodoStore, action: TodoActions) => {
    const todoList = action.payload as ITodo[];
    return { ...store, todoList };
  },
};

export function addToList(todoDetail: ITodo) {
  return (dispatch: TodoDispatchType, getState: () => RootStore) => {
    const todoList = getTodoStore(getState())?.todoList;
    return dispatch({ type: Actions.SET_LIST, payload: [...todoList, todoDetail] });
  };
}
