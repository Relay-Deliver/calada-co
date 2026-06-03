const fs = require('fs');
let c = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');
c = c.replace(/\n(\s*)\n(\s*)href="https:\/\/instagram\.com"/g, '\n$1<a\n$2href="https://instagram.com"');
fs.writeFileSync('src/pages/HomePage.jsx', c, 'utf8');
console.log('done');
