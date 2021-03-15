import React from 'react';
import { initialState, reducers } from './reducers';

let context;

export function AppProvider({ children }) {
  if (!context) {
    context = React.createContext(initialState);
  }
  React.useEffect(
    () => () => {
      context = null;
    },
    []
  );
  const { Provider } = context;
  const [state, dispatch] = React.useReducer(reducers, initialState);
  const data = React.useMemo(() => ({ dispatch, state }), [state, dispatch]);
  return <Provider value={data}>{children}</Provider>;
}

export function useSelector(selector) {
  const { state } = React.useContext(context);
  return selector(state);
}

export function useDispatch() {
  const { dispatch } = React.useContext(context);
  return dispatch;
}
