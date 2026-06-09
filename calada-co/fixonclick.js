const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

// Find the actual onClick pattern in the file
const match = c.match(/onClick=\{[^}]+setSelectedOptions[^}]+\}/);
if (match) {
  console.log('Found pattern:', match[0].substring(0, 100));
} else {
  console.log('Pattern not found - searching for setSelectedOptions');
  const idx = c.indexOf('setSelectedOptions');
  console.log('Context:', c.substring(idx - 50, idx + 150));
}
