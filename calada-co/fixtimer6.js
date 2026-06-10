const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');
c = c.replace("TARGET.setDate(TARGET.getDate() + 30);", '');
fs.writeFileSync('src/components/layout/CountdownBanner.jsx', c, 'utf8');
console.log('done, line removed:', !c.includes('setDate'));
