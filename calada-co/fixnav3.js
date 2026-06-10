const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

c = c.replace(
  `                    Shop now`,
  `                    {activeMenu?.key === 'more' ? 'Learn more' : 'Shop now'}`
);

fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('Learn more'));
