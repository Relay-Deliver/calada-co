const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Fix LogoMark size in navbar
c = c.replace(
  '<LogoMark className="h-full w-full" />',
  '<LogoMark className="h-14 w-auto" />'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('h-14 w-auto'));
