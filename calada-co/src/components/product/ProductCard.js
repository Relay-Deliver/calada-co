import { Link } from 'react-router-dom';
import { formatPrice, isBestSeller, isNew } from '../../services/shopify';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const images = product.images?.edges?.map(e => e.node) || [];
  const price = product.priceRange?.minVariantPrice;
  const comparePrice = product.compareAtPriceRange?.minVariantPrice;
  const onSale = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const bestSeller = isBestSeller(product);
  const newArrival = isNew(product);

  return (
    <div className="product-card">
      <Link to={`/products/${product.handle}`} className="product-card-img-wrap">
        {images[0] && (
          <img
            src={images[0].url}
            alt={images[0].altText || product.title}
            className="product-card-img primary"
          />
        )}
        {images[1] && (
          <img
            src={images[1].url}
            alt={images[1].altText || product.title}
            className="product-card-img secondary"
          />
        )}
        <div className="product-card-badges">
          {bestSeller && <span className="badge badge-pink">Best Seller</span>}
          {newArrival && <span className="badge badge-navy">New</span>}
          {onSale && <span className="badge badge-sale">Sale</span>}
        </div>
      </Link>
      <div className="product-card-body">
        <Link to={`/products/${product.handle}`} className="product-card-title">
          {product.title}
        </Link>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(price.amount, price.currencyCode)}</span>
          {onSale && (
            <span className="price-compare">{formatPrice(comparePrice.amount, comparePrice.currencyCode)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
