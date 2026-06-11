const fs = require('fs');
const n = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');
const i1 = n.indexOf('Fresh boutique');
console.log('=== INTRO COLUMN ===');
console.log(n.substring(i1-600, i1+400));
const p = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');
const i2 = p.indexOf('selectedImg]');
console.log('=== MAIN PRODUCT IMAGE ===');
console.log(p.substring(i2-400, i2+400));
