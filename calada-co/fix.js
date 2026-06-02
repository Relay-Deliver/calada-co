const fs = require('fs');
const files = [
  'src/pages/AccountLoginPage.jsx',
  'src/pages/AccountRegisterPage.jsx'
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // Fix both occurrences of missing <a tag
  c = c.replace(/<a\r?\n(\s*)href=\{SHOPIFY_URL\}/g, '<a\n$1href={SHOPIFY_URL}');
  c = c.replace(/\n(\s*)\r?\n(\s*)href=\{SHOPIFY_URL\}/g, '\n$1<a\n$2href={SHOPIFY_URL}');
  fs.writeFileSync(f, c, 'utf8');
  console.log('fixed', f);
  // Print lines 33-60 to verify
  const lines = c.split('\n');
  lines.slice(32, 60).forEach((l, i) => console.log(i+33, l));
});
