const fs = require('fs');
const c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');
console.log('minPrice state:', c.includes('const [minPrice'));
console.log('maxPrice state:', c.includes('const [maxPrice'));
console.log('priceRange still exists:', c.includes('priceRange'));
console.log('clearFilters:', c.includes('setMinPrice(0)'));
const idx = c.indexOf('minPrice');
console.log('First minPrice context:', c.substring(idx-20, idx+100));
