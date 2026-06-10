const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

// Fix LogoMark to show logo freely without navy bg or clipping
c = c.replace(
  `<span className={\`grid place-items-center   bg-navy shadow-sm ring-1 ring-navy/10 \${className}\`}>
    <img
      src="/assets/cal.png"
      alt="CalAda & Co."
      className="h-full w-full scale-[1.18] object-cover"
    /`,
  `<span className={\`flex items-center \${className}\`}>
    <img
      src="/assets/cal.png"
      alt="CalAda & Co."
      className="h-full w-auto object-contain"
    /`
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done');
