const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');
const idx = c.indexOf('const handleOptionChange');
console.log('Function:', c.substring(idx, idx + 300));
