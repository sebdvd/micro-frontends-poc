export function fetchProducts(page = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const itemsPerPage = 20;
      const products = [];
      const offset = itemsPerPage * (page - 1);
      while (products.length < itemsPerPage) {
        const id = products.length + 1 + offset;
        products.push({ id, name: `Product #${id}` });
      }
      resolve(products);
    }, 1000);
  });
}
