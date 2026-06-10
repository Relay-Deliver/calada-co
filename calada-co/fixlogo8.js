const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

c = c.replace(
  'className={`grid place-items-center    shadow-sm ring-1 ring-navy/10 ${className}`}',
  'className={`flex items-center ${className}`} style={{background:"transparent",border:"none",boxShadow:"none"}}'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
