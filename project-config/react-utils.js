import React from 'react';
import { runSaga, stdChannel } from 'redux-saga';
import { cancel, fork, take } from 'redux-saga/effects';
import { loadCSS } from './css';

export function createAppContext({ initialState, reducer, saga = () => {} }) {
  let context;

  if (!initialState) {
    console.warn('createAppContext: missing initialState');
  }
  if (!reducer) {
    console.warn('createAppContext: missing reducer');
  }

  function AppProvider({ children }) {
    if (!context) {
      context = React.createContext(initialState);
    }

    const channel = React.useMemo(() => stdChannel(), []);
    const lastState = React.useRef(initialState);

    const rootReducer = React.useCallback((state, action) => {
      const newState = reducer(state, action);
      lastState.current = newState;
      channel.put(action);
      return newState;
    }, []);

    const { Provider } = context;
    const [state, dispatch] = React.useReducer(rootReducer, initialState);
    const data = React.useMemo(() => ({ dispatch, state }), [state]);

    React.useLayoutEffect(() => {
      const rootTask = runSaga(
        {
          channel,
          dispatch: (action) => dispatch(action),
          getState: () => lastState.current,
        },
        function* rootSaga() {
          try {
            while (true) {
              const forkedTask = yield fork(saga);
              yield take('!cancel_root_saga!');
              yield cancel(forkedTask);
              yield cancel(rootTask);
            }
          } catch (error) {
            console.error(error);
          }
        }
      );
    }, []);

    React.useEffect(
      () => () => {
        context = null;
        channel.put({ type: '!cancel_root_saga!' });
        channel.close();
      },
      []
    );

    return <Provider value={data}>{children}</Provider>;
  }

  function useSelector(selector) {
    const { state } = React.useContext(context);
    return selector(state);
  }

  function useDispatch() {
    const { dispatch } = React.useContext(context);
    return dispatch;
  }

  return { AppProvider, useSelector, useDispatch };
}

export function CssLoader({
  elemType = 'div',
  elemProps = {},
  children,
  isFragment = false,
}) {
  React.useLayoutEffect(() => {
    loadCSS();
  }, []);
  if (isFragment) {
    return <>{children}</>;
  }
  return React.createElement(
    elemType,
    {
      ...elemProps,
      className: `${CSS_CLASSNAME} ${elemProps.className || ''}`,
    },
    ...React.Children.toArray(children)
  );
}
