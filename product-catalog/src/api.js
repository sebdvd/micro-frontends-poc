export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = [];
      while (products.length < 20) {
        const id = products.length + 1;
        products.push({ id, name: `Product #${id}` });
      }
      resolve(products);
    }, 1000);
  });
}
