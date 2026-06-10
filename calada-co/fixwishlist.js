const fs = require('fs');
let c = fs.readFileSync('src/pages/WishlistPage.jsx', 'utf8');

// Fix wishlist matching - compare end of ID string
c = c.replace(
  'const wishedProducts = allProducts.filter((p) => wishlist.includes(p.id));',
  `const wishedProducts = allProducts.filter((p) =>
    wishlist.some(id =>
      p.id === id ||
      p.id?.endsWith(id) ||
      id?.endsWith(p.id) ||
      p.id?.split('/').pop() === id?.split('/').pop()
    )
  );`
);

fs.writeFileSync('src/pages/WishlistPage.jsx', c, 'utf8');
console.log('done:', c.includes('endsWith'));
