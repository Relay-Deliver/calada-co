const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Remove rounded-full / circular clipping from logo
c = c.replace(/rounded-full/g, '');
c = c.replace(/overflow-hidden/g, '');

// Make logo wider and not constrained
c = c.replace(/height: 140/g, 'height: 52');
c = c.replace(/height: 90/g, 'height: 40');

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
