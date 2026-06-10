const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

c = c.replace(
  'className="absolute left-1/2 top-1/2 flex h-12 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-14 sm:w-44"',
  'className="absolute left-[40%] top-1/2 flex h-10 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-start sm:left-1/2 sm:h-14 sm:w-44"'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('left-[40%]'));
