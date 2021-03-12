import { render } from '@testing-library/react';
import { testHookElement, TestProvider, TestProviderWithStore } from '../../../../utils';
import { useTodoDetail } from '../utils';

describe('utils', () => {
  const containerStore = { todo: { todoDetail: { content: 'old', summary: 'has' } } };
  it('useTodoDetail should get right store data', () => {
    let resultDetail = null;
    const ElementWithHook = testHookElement(() => {
      [resultDetail] = useTodoDetail('content');
    });
    const ContainerWithStore = TestProvider(ElementWithHook, containerStore);
    render(ContainerWithStore);
    expect(resultDetail).toEqual('old'); // hooks execution will trigger in render then resultDetail will get init data
  });
  it('useTodoDetail should dispatch right payload', () => {
    let setItem = null;
    const ElementWithHook = testHookElement(() => {
      [, setItem] = useTodoDetail('content');
    });
    const [ContainerWithStore, store] = TestProviderWithStore(ElementWithHook, containerStore);
    render(ContainerWithStore);
    // @ts-ignore
    setItem('new');
    const actions = store.getActions();
    expect(actions[0].payload).toEqual({ content: 'new', summary: 'has' });
  });
});
