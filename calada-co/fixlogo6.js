const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Fix the logo link container to be wider
c = c.replace(
  'grid-cols-[84px_minmax(0,1fr)_168px]',
  'grid-cols-[200px_minmax(0,1fr)_168px]'
);
c = c.replace(
  'className="grid h-[70px] w-[70px] place-items-center "',
  'className="flex h-[70px] w-[200px] items-center"'
);
c = c.replace(
  '<LogoMark className="h-14 w-auto" />',
  '<LogoMark className="h-12 w-auto max-w-[190px]" />'
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
