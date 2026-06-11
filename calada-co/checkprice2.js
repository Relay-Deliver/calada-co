const fs = require('fs');
const c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');
let idx = 0;
while ((idx = c.indexOf('priceRange', idx)) !== -1) {
  console.log('pos:', idx, '|', c.substring(idx-20, idx+50));
  idx++;
}
