const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Change all "Shop now" in mega menu cards to context-aware labels
c = c.replace(
  /(\{.*?title.*?'Our Story'[\s\S]*?)\bShop now\b/,
  '$1Learn more'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('Learn more'));
