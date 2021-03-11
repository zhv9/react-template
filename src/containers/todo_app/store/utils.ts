import { useDispatch, useSelector } from 'react-redux';
import { TODO_STORE } from '../../../config';
import { RootStore } from '../../../store/reducers';
import { setTodo } from './action_detail';

export function getTodoStore(storeState: RootStore) {
  return storeState[TODO_STORE];
}

export function useTodoDetail(
  todoItemKey: Exclude<keyof ITodo, 'id'>,
): readonly [string, (itemContent: string) => (dispatch: TodoDispatchType) => TodoActions] {
  const todoDetail = useSelector((storeState: RootStore) => getTodoStore(storeState)?.todoDetail);
  const dispatch = useDispatch();
  const setItem = (itemContent: string) => {
    return dispatch(setTodo({ ...todoDetail, [todoItemKey]: itemContent }));
  };
  return [todoDetail[todoItemKey] || '', setItem] as const;
}
