const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

const oldSetOptions = `  const isColorOption = (name) => /colou?r/i.test(name);`;

const newSetOptions = `  const isColorOption = (name) => /colou?r/i.test(name);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
    if (isColorOption(optionName)) {
      const colorLower = value.toLowerCase();
      const matchIndex = images.findIndex((img) =>
        img.altText?.toLowerCase().includes(colorLower) ||
        img.url?.toLowerCase().includes(colorLower)
      );
      if (matchIndex !== -1) setSelectedImg(matchIndex);
      else setSelectedImg(0);
    }
  };`;

c = c.replace(oldSetOptions, newSetOptions);

c = c.replace(
  /onClick=\{\(\) => setSelectedOptions\(\(o\) => \(\{ \.\.\.o, \[option\.name\]: val \}\)\)\}/g,
  'onClick={() => handleOptionChange(option.name, val)}'
);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('done');
