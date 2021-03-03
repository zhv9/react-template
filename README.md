# What Is This Repo

This repo is a template for build React project.

# Structure of this project

- Component: pure component
- Container: business
- Store: data store
- Intl: language
- Service: API service
- Utils: useful utils

## Component

`component` folder contain pure components. All components in this folder:

1. Only have UI logic and driven by data which inject in.
2. Should not able to get data from redux or API. Only get data from props.
3. They should be very easy to reuse.

## Container / Business

`container` folder contain business logic. You can also rename it to `business` if you like.

At this folder you will have below 3 types of UI node. They have different duty.

1. `Container node`: Split page by business parts and output UI layout. This component should be very simple. It may have many layer depend on business/visual design.
2. `Middle node`: This contain `leaf node`. This component get data from redux. This data is to determine how to display `leaf node`. Some times `leaf node` can contain `middle node` 's duty when they together are small enough.
3. `Leaf node`: This is the end of "UI tree". It contain single business item(input or value display) and its label. This node should be very small, or you need further split it.

Why define this 3 types of node?

Because the duty is very clear on this 3 types of node. They only do one simple thing then it is hard to produce bug.

### Container node

`Container node`: Every page can split by lines. One line should contain related business or visual parts. And it can split again to different part base on business.

The `container node` write like this:

```js
export function Detail() {
  return (
    <Section className="todo-section">
      <Summary />
      <Content />
      <ActionBar />
    </Section>
  );
}

// if Summary still big you can split it again.
function Summary() {
  return (
    <Section>
      <Header />
      <Table />
      <Footer />
    </Section>
  )
}
```

### Middle node

This middle node is similar to `container node` but it get data from redux and determine what or how to show contained node.

Because the definition this node may not have or can write into `leaf node`. If the requirement is big and need to check how to show `leaf node` then you will need it.

Normally you only need get data from redux and not trigger actions.

The code should like this:

```js
const PAYMENT_TYPE = {
  payment: 'payment',
  payByLoan: 'payByLoan',
};

function SettlementMethod() {
  const paymentType = useSelector((store) => getSettlementStore(store).paymentType);
  return (
    <>
      {paymentType === PAYMENT_TYPE.payment && <Payment />}
      {paymentType === PAYMENT_TYPE.payByLoan && <payByLoan />}
    </>
  );
}
```

### Leaf node

Leaf node should be a individual business point it should not able to split to smaller part.

At this leaf node you can:

1. Get data from redux and fill into component to trigger UI change.
2. Call action to change redux store's data by UI action.
3. Get/Post data from/to API by UI action.

Typical leaf node of form have a `input` or `selector` and it's `label`. Normally it also have "readonly" check and validator include "mandatory", "input char" and "length" check. And this check config can define at other file for global validation.

Below code is one line(part) of detail page and it have left label and right text input part. The label and input are indivisible so it is `leaf node`.

Because of this simple code it is very hard to produce bug.

```js
export function Content() {
  const intl = useIntl();
  const itemKey = 'content';
  const itemName = intl.get('content');
  const [content, setContent] = useTodoDetail(itemKey);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newContent = e?.target?.value;
    setContent(newContent);
  }
  return (
    <Bar>
      <BarLeft className="todo-bar-left">
        <TextLabel inputId={itemKey} labelText={itemName} />
      </BarLeft>
      <BarRight>
        <TextInput inputId={itemKey} value={content} onChange={onChange} />
      </BarRight>
    </Bar>
  );
}
```

## Redux Store

Most layer of `container node` should have its `redux store and action`. All of them will combine layer by layer to root store which is `src/store`.

Suggest the store design is based on business and data structure. If all sub container or leaf node are one group of business requirement then you can give them a set of `redux store & action`.

The redux should not very big(If you cannot find what you want in seconds then it may a little big). If you find it is too big then you need refactor to split to different part.

### Redux Store Design Suggestion

Normally a redux store contains: `actionTypes`, `action`, `reducer`, `initData`. One `initData` init all field in store. One `reducer` set contain all field's reducer.

Suggestion is:

The `actionTypes` should all defined in one file is same as most of example. Because to prevent duplicate actionType.

Other 3 part `action`, `reducer`, `initData` of one field design is not same as most example. Suggest different field use different file to write its `action`, `reducer`, `initData`. Because different business should at different place. same business in one file. Not separate by technique but by business. Then if you want to check what a store field's life cycle you don't need look into 3 files but only one file.

```js
// action_detail.ts // all field of detail's redux store life cycle defined in one file
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
```

```js
// reducer.ts
import { detailReducerMap, initDetail } from './action_detail';
import { summaryListReducerMap } from './action_list';

export const initStore = {
  todoDetail: initDetail(), // merge initDetail into store
  todoList: [],
};

const reducerMap = {
  ...detailReducerMap, // merge reducer into reducerMap
  ...summaryListReducerMap,
};

export function todoReducer(state: TodoStore = initStore, action: TodoActions): TodoStore {
  const reducer = reducerMap[action.type];
  return reducer ? reducer(state, action) : state;
}
```

```js
// index.ts // this is to export all actions and reducer for container part. Then import will have a better view
import { todoReducer } from './reducer'; // export reducer to rootReducer
import { setTodo } from './action_detail'; // export action for container part
import { addToList } from './action_list';

export { todoReducer, setTodo, addToList };
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
