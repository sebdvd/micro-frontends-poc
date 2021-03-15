import { put, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  NEXT_PRODUCTS,
  PREVIOUS_PRODUCTS,
  receiveProducts,
} from './actions';
import * as api from './api';

export function* mainSaga() {
  yield takeLatest(
    [FETCH_PRODUCTS, NEXT_PRODUCTS, PREVIOUS_PRODUCTS],
    fetchProductsSaga
  );
}

function* fetchProductsSaga() {
  try {
    const page = yield select((state) => state.page);
    const products = yield api.fetchProducts(page);
    yield put(receiveProducts(products));
  } catch (error) {
    console.log(error);
    yield put(receiveProducts([]));
  }
}
