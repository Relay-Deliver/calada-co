const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

// Fix Add to Cart button encoding and add color/size to button text
c = c.replace(
  /\{added \? '.*?Added to Bag!' : cartLoading \? '.*?Adding.*?' : canAdd \? 'Add to Cart' : 'Unavailable'\}/,
  `{added ? '\u2713 Added to Bag!' : cartLoading ? 'Adding...' : canAdd
    ? ('Add to Cart' + (selectedOptions['Color'] ? ' \u2014 ' + selectedOptions['Color'] : '') + (selectedOptions['Size'] ? ' / ' + selectedOptions['Size'] : ''))
    : 'Select options'}`
);

// Fix color swatch ring effect when selected
c = c.replace(
  /style=\{hex \? \{ backgroundColor: hex \} : undefined\}/,
  `style={hex ? {
                          backgroundColor: hex,
                          boxShadow: active ? \`0 0 0 2px white, 0 0 0 4px \${hex}\` : undefined,
                        } : undefined}`
);

// Add color name label next to option name
c = c.replace(
  '<p className="text-sm font-semibold uppercase tracking-widest text-gray-700">{option.name}</p>',
  `<p className="text-sm font-semibold uppercase tracking-widest text-gray-700">
                    {option.name}
                    {isColorOption(option.name) && selectedOptions[option.name] && (
                      <span className="ml-2 text-sm font-normal normal-case tracking-normal text-[#c084a0]">
                        \u2014 {selectedOptions[option.name]}
                      </span>
                    )}
                  </p>`
);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('product done');
