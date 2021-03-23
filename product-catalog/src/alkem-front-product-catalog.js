import { CssLoader } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { AppProvider } from './context';
import { ProductCatalog } from './product-catalog';
import './styles.css';

function ProductCatalogMFE() {
  return (
    <AppProvider>
      <CssLoader>
        <ProductCatalog />
      </CssLoader>
    </AppProvider>
  );
}

export const component = () => ProductCatalogMFE;
