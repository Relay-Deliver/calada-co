import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../services/shopify';
import './CartDrawer.css';

export default function CartDrawer() {
  const {
    cart, isOpen, closeCart, updateItem, removeItem,
    itemCount, totalPrice, currencyCode, checkoutUrl, loading, error,
  } = useCart();

  const lines = cart?.lines?.edges?.map(e => e.node) || [];

  const handleCheckout = () => {
    if (!checkoutUrl || checkoutUrl === '#') return;
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  // Free shipping threshold
  const subtotal = parseFloat(totalPrice) || 0;
  const FREE_SHIPPING_THRESHOLD = 79;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifies = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={closeCart} />}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>

        {/* ── Header ── */}
        <div className="drawer-header">
          <h2>Your Cart {itemCount > 0 && <span className="cart-count">({itemCount})</span>}</h2>
          <button onClick={closeCart} className="drawer-close" aria-label="Close">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Free shipping bar ── */}
        {lines.length > 0 && (
          <div className="shipping-bar">
            {qualifies ? (
              <p className="shipping-bar-text qualified">🎉 You've qualified for <strong>FREE shipping!</strong></p>
            ) : (
              <p className="shipping-bar-text">
                You're <strong>${remaining.toFixed(2)}</strong> away from free shipping!
              </p>
            )}
            <div className="shipping-bar-track">
              <div className="shipping-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* ── Body ── */}
        <div className="drawer-body">
          {error && <div className="cart-error">{error}</div>}

          {lines.length === 0 ? (
            <div className="empty-cart">
              <svg width="56" height="56" fill="none" stroke="#c084a0" strokeWidth="1.4" viewBox="0 0 24 24" opacity="0.35">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
              </svg>
              <p className="empty-cart-title">Your cart is empty</p>
              <p className="empty-cart-sub">Add some items to get started!</p>
              <button className="continue-btn" onClick={closeCart}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {lines.map(line => {
                const img = line.merchandise.product.images.edges[0]?.node;
                const variantName = line.merchandise.title !== 'Default Title' ? line.merchandise.title : '';
                const lineTotal = (parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2);
                return (
                  <div key={line.id} className="cart-item">
                    <div className="cart-item-img">
                      {img
                        ? <img src={img.url} alt={img.altText || line.merchandise.product.title} />
                        : <div className="cart-item-img-placeholder" />
                      }
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <p className="cart-item-name">{line.merchandise.product.title}</p>
                        <button
                          className="cart-item-remove"
                          onClick={() => removeItem(line.id)}
                          aria-label="Remove"
                        >
                          Remove
                        </button>
                      </div>
                      {variantName && <p className="cart-item-variant">Size: {variantName}</p>}
                      <div className="cart-item-bottom">
                        <div className="cart-item-qty">
                          <button
                            onClick={() => line.quantity > 1
                              ? updateItem(line.id, line.quantity - 1)
                              : removeItem(line.id)}
                            disabled={loading}
                            aria-label="Decrease"
                          >−</button>
                          <span>{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={loading}
                            aria-label="Increase"
                          >+</button>
                        </div>
                        <p className="cart-item-price">
                          {formatPrice(lineTotal, line.merchandise.price.currencyCode)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {lines.length > 0 && (
          <div className="drawer-footer">
            <div className="savings-row">
              <span>🏷 Savings</span>
              <span className="savings-amount">$0.00</span>
            </div>
            <div className="subtotal-row">
              <span>SUBTOTAL</span>
              <span>{formatPrice(totalPrice, currencyCode)}</span>
            </div>

            <div className="discount-row">
              <input
                className="discount-input"
                type="text"
                placeholder="Discount code or gift card"
              />
              <button className="discount-apply-btn">apply</button>
            </div>

            <button
              className="checkout-btn"
              disabled={checkoutUrl === '#' || loading}
              onClick={handleCheckout}
            >
              {loading ? 'Updating…' : 'Checkout'}
            </button>

            <button className="checkout-plain-btn" onClick={handleCheckout}>
              checkout without free returns
            </button>
          </div>
        )}

      </div>
    </>
  );
}