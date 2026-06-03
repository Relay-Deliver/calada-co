const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Footer.jsx', 'utf8');
c = c.replace(/\n(\s*)\n(\s*)href="https:\/\/instagram\.com"/g, '\n$1<a\n$2href="https://instagram.com"');
c = c.replace(/\n(\s*)\n(\s*)href="https:\/\/tiktok\.com"/g, '\n$1<a\n$2href="https://tiktok.com"');
fs.writeFileSync('src/components/layout/Footer.jsx', c, 'utf8');
console.log('done');
