const fs = require('fs');
let c = fs.readFileSync('src/pages/WishlistPage.jsx', 'utf8');
c = c.replace(
  `    import('../services/shopify').then(({ getProducts }) => {
      getProducts({ first: 50 })`,
  `    const { getProducts } = await import('../services/shopify');
    getProducts({ first: 50 })`
);
// Fix to use static import instead
c = c.replace(
  "import('../services/shopify').then(({ getProducts }) => {",
  ""
);
fs.writeFileSync('src/pages/WishlistPage.jsx', c, 'utf8');
