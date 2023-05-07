### React.js

```typescript
import { useEffect, useState } from "react";

// 의존성을 주입받는 징검다리
import ReactSharedInternals from "./ReactSharedInternals";

const React = {
  useState,
  useEffect,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

export default React;
```

### ReactHooks.js

개발자가 React 코어로부터 가져오는 훅들은 `ReactHooks.js` 모듈에서 가져온다. 그리고 아래 코드를 보면 알 수 있듯, 각각의 훅들은 `ReactCurrentDispatcher.js` 모듈에서 가지고온 `current` 값인 `dispatcher` 의 메서드이다.

```typescript
import ReactCurrentDispatcher from "./ReactCurrentDispatcher";

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher;
}

export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useEffect(create, inputs) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}
/*...*/
```

### ReactCurrentDispatcher.current

그럼 `ReactCurrentDispatcher` 는 무엇인가.. 하고 따라가보면 `null` 이다. `current` 키값에 `null` 을 value 로 가지는 하나의 객체..? 이다.

```javascript
const ReactCurrentDispatcher = {
  current: null,
};

export default ReactCurrentDispatcher;
```

코어는 컴포넌트의 모델인 React element 만 알고 있으며, element 를 인스턴스화 되기 전인 클래스라 생각을 한다면 훅은 이 클래스의 인스턴스화된 객체의 상태 값을 관리하는 역할을 한다.

React element 는 fiber(컴포넌트 및 컴포넌트의 입력과 출력에 대한 정보를 포함한 javascript 객체) 로 확장된 이후에야 살아 숨쉬게 되며, 이 역할은 reconciler 가 한다. 그렇기 때문에 훅 또한 reconciler 가 알고 있는 것이 맞다.

훅 객체는 외부에서 내부로 `ReactCurrentDispatcher.current` 를 통해 주입해준다. 훅은 `reconciler/renderWithHooks()` 에서 이루어진다. 컴포넌트 호출 또한 여기서 이루어진다.이 함수는 Render phase 에서 실행된다.

### reconciler > ReactFiberHooks.js

```javascript
export function renderWithHooks(
  current: Fiber,
  workInProgress: Fiber,
  Component: any,
  props: any,
  refOrContext: any,
  nextRenderExpirationTime: ExpirationTime
) {
  /*...*/
  currentlyRenderingFiber = workInProgress; // 현재 작업 중인 fiber를 전역으로 잡아둠
  nextCurrentHook = current !== null ? current.memoizedState : null;

  ReactCurrentDispatcher.current =
    nextCurrentHook === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;

  let children = Component(props, refOrContext);

  /*컴포넌트 재호출 로직*/

  const renderedWork = currentlyRenderingFiber;
  renderedWork.memoizedState = firstWorkInProgressHook;

  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  currentlyRenderingFiber = null;
  /*...*/
}
```

### reconciler > ReactFiberHooks.js

```javascript
// mount
const HooksDispatcherOnMount = {
  useState: mountState,
  useEffect: mountEffect,
  /*...*/
};

// update
const HooksDispatcherOnUpdate: = {
  useState: updateState,
  useEffect: updateEffect,
  /*...*/
};

// invalid hook call
export const ContextOnlyDispatcher: Dispatcher = {
  useState: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  /*...*/
};
```
