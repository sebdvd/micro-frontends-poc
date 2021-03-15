import React from 'react';
import { fetchProducts, receiveProducts } from './actions';
import * as api from './api';
import { useDispatch, useSelector } from './context';

export function ProductCatalog() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.isFetching);
  const products = useSelector((state) => state.products);

  React.useEffect(() => {
    let isMounted = true;
    dispatch(fetchProducts());
    api
      .fetchProducts()
      .then((response) => {
        if (isMounted) {
          dispatch(receiveProducts(response));
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <section className="ProductCatalog">
      <h1>Products catalog</h1>
      {products.length ? (
        <table className="ProductCatalog__table" border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : isFetching ? (
        'Loading...'
      ) : (
        'Empty.'
      )}
    </section>
  );
}
