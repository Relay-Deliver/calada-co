import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByHandle, formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

export default function ProductPage() {
  const { handle } = useParams();
  const { addItem, loading: cartLoading } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProductByHandle(handle).then(p => {
      setProduct(p);
      if (p?.variants?.edges?.length) {
        setSelectedVariant(p.variants.edges[0].node);
      }
      if (p?.options) {
        const defaults = {};
        p.options.forEach(o => { defaults[o.name] = o.values[0]; });
        setSelectedOptions(defaults);
      }
    }).finally(() => setLoading(false));
  }, [handle]);

  const selectOption = (name, value) => {
    const newOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(newOptions);
    const variant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(o => newOptions[o.name] === o.value)
    );
    if (variant) setSelectedVariant(variant.node);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = product?.images?.edges?.map(e => e.node) || [];
  const price = selectedVariant?.price || product?.priceRange?.minVariantPrice;
  const comparePrice = selectedVariant?.compareAtPrice;

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!product) return <div className="container" style={{padding:'60px 20px'}}><p>Product not found. <Link to="/shop">Back to shop</Link></p></div>;

  return (
    <div className="product-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › <span>{product.title}</span>
        </nav>

        <div className="product-layout">
          {/* Images */}
          <div className="product-images">
            <div className="main-image">
              {images[selectedImg] && (
                <img src={images[selectedImg].url} alt={images[selectedImg].altText || product.title} />
              )}
            </div>
            {images.length > 1 && (
              <div className="thumb-row">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${selectedImg === i ? 'active' : ''}`}
                    onClick={() => setSelectedImg(i)}
                  >
                    <img src={img.url} alt={img.altText || `Image ${i+1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="product-details">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-price-row">
              {price && <span className="product-price">{formatPrice(price.amount, price.currencyCode)}</span>}
              {comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount) && (
                <span className="product-compare">{formatPrice(comparePrice.amount, comparePrice.currencyCode)}</span>
              )}
            </div>

            {/* Options */}
            {product.options?.filter(o => o.values.length > 1).map(option => (
              <div key={option.name} className="option-group">
                <p className="option-label">{option.name}</p>
                <div className="option-values">
                  {option.values.map(val => (
                    <button
                      key={val}
                      className={`option-btn ${selectedOptions[option.name] === val ? 'selected' : ''}`}
                      onClick={() => selectOption(option.name, val)}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Add to cart */}
            <button
              className={`btn btn-primary btn-full add-to-cart ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
            >
              {added ? '✓ Added to Bag!' : !selectedVariant?.availableForSale ? 'Sold Out' : 'Add to Bag'}
            </button>

            {/* Description */}
            {product.description && (
              <div className="product-description">
                <h3>Details</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-meta">
              <p>🧵 Made to order — ready in 3–5 business days</p>
              <p>↩️ Easy 30-day returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
