export const FETCH_PRODUCTS = 'fetch_products';
export const RECEIVE_PRODCUTS = 'receive_products';
export const NEXT_PRODUCTS = 'next_products';
export const PREVIOUS_PRODUCTS = 'previous_products';

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const receiveProducts = (products) => ({
  type: RECEIVE_PRODCUTS,
  products,
});
export const fetchNextProduct = () => ({ type: NEXT_PRODUCTS });
export const fetchPreviousProduct = () => ({ type: PREVIOUS_PRODUCTS });
