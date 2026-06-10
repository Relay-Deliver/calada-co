const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');
c = c.replace(/Business Logos-3\.png/g, 'business-logo.png');
c = c.replace(/height: 160/g, 'height: 180');
c = c.replace(/height: 110/g, 'height: 120');
fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('business-logo.png'));
