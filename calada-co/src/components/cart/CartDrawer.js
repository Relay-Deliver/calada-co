import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../services/shopify';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, itemCount, totalPrice, currencyCode, checkoutUrl, loading } = useCart();
  const lines = cart?.lines?.edges?.map(e => e.node) || [];

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={closeCart} />}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Bag ({itemCount})</h2>
          <button onClick={closeCart} className="drawer-close" aria-label="Close cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="empty-cart">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p>Your bag is empty</p>
              <button className="btn btn-pink" onClick={closeCart}>Continue Shopping</button>
            </div>
          ) : (
            lines.map(line => {
              const img = line.merchandise.product.images.edges[0]?.node;
              return (
                <div key={line.id} className="cart-item">
                  <div className="cart-item-img">
                    {img && <img src={img.url} alt={img.altText || line.merchandise.product.title} />}
                  </div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{line.merchandise.product.title}</p>
                    <p className="cart-item-variant">{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</p>
                    <p className="cart-item-price">{formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}</p>
                    <div className="cart-item-qty">
                      <button onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)} disabled={loading}>−</button>
                      <span>{line.quantity}</span>
                      <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={loading}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeItem(line.id)} aria-label="Remove item">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice, currencyCode)}</span>
            </div>
            <p className="cart-note">Shipping & taxes calculated at checkout</p>
            <a href={checkoutUrl} className="btn btn-primary btn-full">Checkout →</a>
          </div>
        )}
      </div>
    </>
  );
}
