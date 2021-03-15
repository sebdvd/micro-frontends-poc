export const FETCH_PRODUCTS = 'fetch_products';
export const RECEIVE_PRODCUTS = 'receive_products';

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const receiveProducts = (products) => ({
  type: RECEIVE_PRODCUTS,
  products,
});
