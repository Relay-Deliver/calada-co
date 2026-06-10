const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Remove any remaining bg-navy from LogoMark span
c = c.replace(
  /className=\{`flex items-center \$\{className\}`\}/,
  'className={`flex items-center ${className}`} style={{background:"transparent"}}'
);

// Also check for any bg class on the span
c = c.replace(/bg-navy/g, '');
c = c.replace(/bg-\[#1a2744\]/g, '');

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
