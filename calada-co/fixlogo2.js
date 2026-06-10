const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');
c = c.replace(/business-logo\.png/g, 'cal.png');
c = c.replace(/height: 180/g, 'height: 140');
c = c.replace(/height: 120/g, 'height: 90');
fs.writeFileSync('src/components/layout/Navbar.jsx', c, 'utf8');
console.log('done:', c.includes('cal.png'));
