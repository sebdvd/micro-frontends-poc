import {
  FETCH_PRODUCTS,
  NEXT_PRODUCTS,
  PREVIOUS_PRODUCTS,
  RECEIVE_PRODCUTS,
} from './actions';

export const initialState = {
  isFetching: true,
  page: 1,
  products: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, isFetching: true, page: 1 };
    case RECEIVE_PRODCUTS:
      return { ...state, isFetching: false, products: action.products };
    case NEXT_PRODUCTS:
      return { ...state, isFetching: true, page: state.page + 1 };
    case PREVIOUS_PRODUCTS: {
      const nextPage = state.page - 1 || 1;
      return state.page !== nextPage
        ? { ...state, isFetching: true, page: state.page - 1 || 1 }
        : state;
    }
    default:
      return state;
  }
}
