const fs = require('fs');
let v = fs.readFileSync('src/data/visuals.js', 'utf8');

// Find and replace only the Our Story card image
const ourStoryIdx = v.indexOf("title: 'Our Story'");
const imageIdx = v.indexOf("image:", ourStoryIdx);
const lineEnd = v.indexOf('\n', imageIdx);
const oldLine = v.substring(imageIdx, lineEnd);
console.log('Old line:', oldLine);

v = v.substring(0, imageIdx) + "image: '/assets/family.png'," + v.substring(lineEnd);
fs.writeFileSync('src/data/visuals.js', v, 'utf8');
console.log('done:', v.includes("title: 'Our Story'") && v.indexOf("'/assets/family.png'") > v.indexOf("title: 'Our Story'"));
