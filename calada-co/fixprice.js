const fs = require('fs');
let c = fs.readFileSync('src/pages/ShopPage.jsx', 'utf8');

// Replace priceRange array with minPrice/maxPrice
c = c.replace(
  "const [priceRange, setPriceRange] = useState([0, 200]);",
  "const [minPrice, setMinPrice] = useState(0);\r\n  const [maxPrice, setMaxPrice] = useState(200);"
);

c = c.replace(
  "const price = Number(p.priceRange?.minVariantPrice?.amount || 0);\r\n      return price >= priceRange[0] && price <= priceRange[1];",
  "const price = Number(p.priceRange?.minVariantPrice?.amount || 0);\r\n      return price >= minPrice && price <= maxPrice;"
);

c = c.replace(/\[products, sort, priceRange,/, '[products, sort, minPrice, maxPrice,');
c = c.replace("clearFilters = () => { setSelectedSizes([]); setSelectedAgeGroups([]); setPriceRange([0, 200]); };", "clearFilters = () => { setSelectedSizes([]); setSelectedAgeGroups([]); setMinPrice(0); setMaxPrice(200); };");
c = c.replace("'$0'}", "'$' + minPrice}");
c = c.replace("'$' + priceRange[1]}", "'$' + maxPrice}");
c = c.replace("max={200}\r\n            value={priceRange[1]}\r\n            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}", "max={200}\r\n            value={maxPrice}\r\n            onChange={e => setMaxPrice(Number(e.target.value))}");
c = c.replace("value={priceRange[0]}\r\n              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}", "value={minPrice}\r\n              onChange={e => setMinPrice(Number(e.target.value))}");
c = c.replace("value={priceRange[1]}\r\n              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}", "value={maxPrice}\r\n              onChange={e => setMaxPrice(Number(e.target.value))}");

fs.writeFileSync('src/pages/ShopPage.jsx', c, 'utf8');
console.log('done:', c.includes('minPrice'));
