const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');

c = c.replace(
  /const getTarget[\s\S]*?const TARGET = getTarget\(\);/,
  `const TARGET = new Date('2026-07-01T00:00:00');`
);

fs.writeFileSync('src/components/layout/CountdownBanner.jsx', c, 'utf8');
console.log('done:', c.includes("2026-07-01"));
