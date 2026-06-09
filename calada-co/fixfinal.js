const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

// Add handleOptionChange function after the sizeError state
c = c.replace(
  "const [sizeError, setSizeError] = useState(false);",
  `const [sizeError, setSizeError] = useState(false);

  const handleOptionChange = (optionName, val) => {
    setSelectedOptions((o) => ({ ...o, [optionName]: val }));
    if (isColorOption(optionName)) {
      const colorLower = val.toLowerCase();
      const matchIndex = images.findIndex((img) =>
        img.altText?.toLowerCase().includes(colorLower) ||
        img.url?.toLowerCase().includes(colorLower)
      );
      setSelectedImg(matchIndex !== -1 ? matchIndex : 0);
    }
  };`
);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('handleOptionChange added:', c.includes('const handleOptionChange'));
