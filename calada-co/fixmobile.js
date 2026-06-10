const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

c = c.replace(
  'className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center  sm:h-16 sm:w-16"',
  'className="absolute left-1/2 top-1/2 flex h-14 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-16 sm:w-56"'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('w-48'));
