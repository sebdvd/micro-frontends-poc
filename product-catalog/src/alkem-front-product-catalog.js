import { useStyles } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { AppProvider } from './context';
import { ProductCatalog } from './product-catalog';
import styles from './styles.css';

function ProductCatalogMFE() {
  useStyles(styles);
  return (
    <AppProvider>
      <ProductCatalog />
    </AppProvider>
  );
}

export const component = () => ProductCatalogMFE;
