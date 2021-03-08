import { useStyles } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { fetchProducts } from './api';
import styles from './styles.css';

function ProductCatalog() {
  useStyles(styles);
  const [products, setProducts] = React.useState(() => ({
    list: [],
    isLoading: true,
  }));

  React.useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((response) => {
        if (isMounted) {
          setProducts({ list: response, isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="ProductCatalog">
      <h1>Products catalog</h1>
      {products.list.length ? (
        <table className="ProductCatalog__table" border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {products.list.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : products.isLoading ? (
        'Loading...'
      ) : (
        'Empty.'
      )}
    </section>
  );
}

export const component = () => ProductCatalog;
