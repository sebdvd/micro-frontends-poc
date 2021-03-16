import { createAppContext } from '@alkem/front-project-config/react-utils';
import { initialState, reducer } from './reducer';
import { saga } from './saga';

export const { AppProvider, useSelector, useDispatch } = createAppContext({
  initialState,
  reducer,
  saga,
});
