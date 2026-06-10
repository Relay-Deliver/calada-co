const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');
c = c.replace(
  'king-[0.18em] text-[#c084a0]">Shop now</span>',
  'king-[0.18em] text-[#c084a0]">{card.cta || "Learn more"}</span>'
);
fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('card.cta'));
