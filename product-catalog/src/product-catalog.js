import React from 'react';
import {
  fetchNextProduct,
  fetchPreviousProduct,
  fetchProducts,
} from './actions';
import { useDispatch, useSelector } from './context';

export function ProductCatalog() {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.isFetching);
  const products = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="ProductCatalog">
      <div className="ProductCatalog__header">
        <h1>Products catalog</h1>
        <div>
          <button onClick={() => dispatch(fetchPreviousProduct())}>
            Previous
          </button>
          <button onClick={() => dispatch(fetchNextProduct())}>Next</button>
        </div>
        {isFetching ? <div>Loading...</div> : null}
      </div>
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
      ) : (
        !isFetching && 'Empty.'
      )}
    </section>
  );
}
