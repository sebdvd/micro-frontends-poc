import { FETCH_PRODUCTS, RECEIVE_PRODCUTS } from './actions';

export const initialState = {
  isFetching: true,
  products: [],
};

export function reducers(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, isFetching: true };
    case RECEIVE_PRODCUTS:
      return { ...state, isFetching: false, products: action.products };
    default:
      return state;
  }
}
