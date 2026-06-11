const fs = require('fs');
let c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');

c = c.replace('${priceRange[0]}', '${minPrice}');
c = c.replace('${priceRange[1]}', '${maxPrice}');
c = c.replace('value={priceRange[1]}\r\n            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}', 'value={maxPrice}\r\n            onChange={e => setMaxPrice(Number(e.target.value))}');

fs.writeFileSync('src/pages/ShopPage.jsx', c, 'utf8');
console.log('priceRange remaining:', (c.match(/priceRange/g) || []).length);
