const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');

// Force TARGET to always be July 1 2026 - no localStorage
c = c.replace(/const getTarget[\s\S]*?const TARGET = getTarget\(\);/, "const TARGET = new Date('2026-07-01T00:00:00');");
c = c.replace(/const TARGET = new Date\(.*?\);/, "const TARGET = new Date('2026-07-01T00:00:00');");

fs.writeFileSync('src/components/layout/CountdownBanner.jsx', c, 'utf8');
console.log('done:', c.includes('2026-07-01'));
console.log('Target line:', c.match(/const TARGET.*/)[0]);
