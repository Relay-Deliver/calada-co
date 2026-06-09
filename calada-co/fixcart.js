const fs = require('fs');
let c = fs.readFileSync('src/pages/ProductPage.jsx', 'utf8');

// Add quantity state
c = c.replace(
  "const [openSection, setOpenSection] = useState('description');",
  "const [openSection, setOpenSection] = useState('description');\n  const [quantity, setQuantity] = useState(1);\n  const [sizeError, setSizeError] = useState(false);"
);

// Update handleAddToCart to check size selection
c = c.replace(
  /const handleAddToCart = async[^}]+\n  };/,
  `const handleAddToCart = async () => {
    const sizeOption = product?.options?.find(o => /size/i.test(o.name));
    if (sizeOption && !selectedOptions[sizeOption.name]) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    if (!variant?.id || cartLoading) return;
    try {
      for (let i = 0; i < quantity; i++) {
        await addItem(variant.id);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch {}
  };`
);

// Add quantity selector before Add to Cart button
c = c.replace(
  '          {/* Add to Cart + Wishlist row */}',
  `          {/* Quantity selector */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-700">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0] transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center text-base font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-lg font-bold text-gray-700 hover:border-[#c084a0] hover:text-[#c084a0] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {sizeError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600 font-medium">
              Please select a size before adding to cart.
            </div>
          )}

          {/* Add to Cart + Wishlist row */}`
);

fs.writeFileSync('src/pages/ProductPage.jsx', c, 'utf8');
console.log('done');
