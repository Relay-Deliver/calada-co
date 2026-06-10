const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

c = c.replace(
  'className="absolute left-1/2 top-1/2 flex h-14 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-16 sm:w-56"',
  'className="absolute left-1/2 top-1/2 flex h-12 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-14 sm:w-44"'
);

// Also make the LogoMark image smaller on mobile
c = c.replace(
  'className="h-full w-auto object-contain"',
  'className="h-full w-auto max-w-full object-contain"'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('w-32'));
