import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { initDetail, setTodo } from '../action_detail';
import { initStore, todoReducer } from '../reducer';
import * as Actions from '../action_types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action_detail.ts', () => {
  it('set one field action should return its action', () => {
    const store = mockStore({ content: 'some content', summary: '' });
    const payload = { summary: 'new summary' };
    const expected = { type: Actions.SET_DETAIL, payload };
    // @ts-ignore
    const result = store.dispatch(setTodo(payload));
    expect(result).toEqual(expected);
  });

  it('should return initial store', () => {
    // @ts-ignore
    let storeResult = todoReducer(undefined, {});
    expect(storeResult.todoDetail).toEqual(initDetail());
  });
  it('have filled content set summary should return all two', () => {
    const payload = { content: 'some content', summary: 'new summary' };
    let storeResult = todoReducer(initStore, { type: Actions.SET_DETAIL, payload });
    expect(storeResult.todoDetail).toEqual(payload);
  });
});
