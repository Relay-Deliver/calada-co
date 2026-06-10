const fs = require('fs');
const c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');
const idx = c.indexOf('type="range"');
console.log(c.substring(idx-50, idx+300));
