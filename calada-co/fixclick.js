const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');
c = c.replace(
  /onClick=\{\(\) => setSelectedOptions\(\(o\) => \(\{ \.\.\.o, \[option\.name\]: val \}\)\)\}/g,
  'onClick={() => handleColorSelect(option.name, val, images, setSelectedOptions, setSelectedImg)}'
);
fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('click handler done');
