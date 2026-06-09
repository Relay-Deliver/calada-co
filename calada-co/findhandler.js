const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');
const idx = c.indexOf('handleOptionChange');
console.log('handleOptionChange context:');
console.log(c.substring(idx - 20, idx + 200));
