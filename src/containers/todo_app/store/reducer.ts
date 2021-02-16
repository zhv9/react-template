import { detailReducerMap, initDetail } from './action_detail';
import { summaryListReducerMap } from './action_list';

export const initStore = {
  todoDetail: initDetail(),
  todoList: [],
};

const reducerMap = {
  ...detailReducerMap,
  ...summaryListReducerMap,
};

export function todoReducer(state: TodoStore = initStore, action: TodoActions): TodoStore {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
}
