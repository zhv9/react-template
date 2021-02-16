import * as Actions from './action_types';

export function initDetail() {
  return { content: '', summary: '' };
}

export const detailReducerMap = {
  [Actions.SET_DETAIL]: (store: TodoStore, action: TodoActions) => {
    const todoDetail: ITodo = action.payload as ITodo;
    return { ...store, todoDetail };
  },
};

export function setTodo(todo: ITodo) {
  return (dispatch: TodoDispatchType) => {
    return dispatch({ type: Actions.SET_DETAIL, payload: todo });
  };
}
