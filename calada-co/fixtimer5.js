const fs = require('fs');
let c = fs.readFileSync('src/components/layout/CountdownBanner.jsx', 'utf8');
console.log('First 300 chars:', c.substring(0, 300));
