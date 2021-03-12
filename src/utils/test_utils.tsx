import { AnyAction, applyMiddleware, createStore, Dispatch, Middleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { rootReducer, rootStore } from '../store/reducers';

function TestHook({ callback }: { callback: () => unknown }) {
  callback();
  return null;
}

/** For test hooks with redux, you can do:
 *
 * let customHooksResult = null;
 * const ElementWithHook = testHookElement(() => {
 *  customHooksResult = yourCustomHooks();
 * });
 * const ContainerWithStore = TestProvider(ElementWithHook, containerStore);
 *
 * Then you can do what you want on "customHooksResult"
 */
export function testHookElement(callback: () => unknown): JSX.Element {
  return <TestHook callback={callback} />;
}

/** For test pure hooks(without redux) you can do:
 *
 * let customHooksResult = null;
 * testHook(() => {
 *  customHooksResult = yourCustomHooks();
 * });
 *
 * Then you can do what you want on "customHooksResult"
 */
export function testHook(callback: () => unknown): void {
  render(testHookElement(callback));
}

export function TestProviderWithStore(
  testComponent: JSX.Element,
  componentStoreData: { [key: string]: unknown } = {},
  middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [thunk],
) {
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(componentStoreData);
  return [<Provider store={store}>{testComponent}</Provider>, store] as const;
}

export function TestProvider(
  testComponent: JSX.Element,
  componentStoreData: { [key: string]: unknown } = {},
  middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [thunk],
) {
  const [ProviderWithStore] = TestProviderWithStore(testComponent, componentStoreData, middlewares);
  return ProviderWithStore;
}

export function RealStoreTestProvider(
  testComponent: JSX.Element,
  initialState: { [key: string]: unknown } = rootStore,
  middleware: Middleware<any, any, any> = thunk,
) {
  const store = createStore(rootReducer, initialState, applyMiddleware(middleware));
  return <Provider store={store}>{testComponent}</Provider>;
}
