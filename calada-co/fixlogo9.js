const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');
c = c.replace('h-12 w-auto max-w-[190px]', 'h-16 w-auto max-w-[240px]');
c = c.replace('grid-cols-[200px_minmax(0,1fr)_168px]', 'grid-cols-[260px_minmax(0,1fr)_168px]');
c = c.replace('className="flex h-[70px] w-[200px] items-center"', 'className="flex h-[70px] w-[260px] items-center"');
fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
