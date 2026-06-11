import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../services/shopify';
import PaymentMethods from './PaymentMethods';

export default function CartDrawer() {
  const {
    cart, isOpen, closeCart, updateItem, removeItem,
    itemCount, totalPrice, currencyCode, checkoutUrl, loading, error,
  } = useCart();

  const lines = cart?.lines?.edges?.map(e => e.node) || [];

  const handleCheckout = () => {
    if (!checkoutUrl || checkoutUrl === '#') return;
    window.location.assign(checkoutUrl);
  };

  const subtotal = parseFloat(totalPrice) || 0;
  const FREE_SHIPPING_THRESHOLD = 65;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifies = subtotal >= FREE_SHIPPING_THRESHOLD;
  const checkoutDisabled = checkoutUrl === '#' || loading;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-[200] backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      <div className={`fixed right-0 top-0 z-[201] flex h-full w-full max-w-[460px] flex-col bg-white shadow-[-6px_0_32px_rgba(0,0,0,0.13)] transition-transform duration-[320ms] ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-light bg-[#fff8fb] px-6 pb-[18px] pt-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-pink">Shopping Bag</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold leading-none text-navy">
              Your Cart {itemCount > 0 && <span className="font-sans text-base font-bold">({itemCount})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#555555] transition-colors hover:bg-[#f5f5f5]"
            aria-label="Close"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Free shipping bar */}
        {lines.length > 0 && (
          <div className="border-b border-[#f0f0f0] bg-white px-6 pb-3.5 pt-3">
            {qualifies ? (
              <p className="mb-2 text-center text-[13px] text-[#2a7a2a]">
                You've qualified for <strong>free shipping.</strong>
              </p>
            ) : (
              <p className="mb-2 text-center text-[13px] text-[#444444]">
                You're <strong>{formatPrice(remaining, currencyCode)}</strong> away from free shipping.
              </p>
            )}
            <div className="h-1.5 bg-[#e8e8e8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c084a0] to-[#e879a8] rounded-full transition-[width] duration-[400ms]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto pt-2 px-6 pb-4">
          {error && (
            <div className="bg-[#fff0f4] border border-[#f8c8d4] text-[#c0385a] rounded-lg px-3.5 py-2.5 text-[13px] my-3">
              {error}
            </div>
          )}

          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 h-[320px] text-center">
              <svg width="56" height="56" fill="none" stroke="#c084a0" strokeWidth="1.4" viewBox="0 0 24 24" opacity="0.35">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
              </svg>
              <p className="text-[17px] font-semibold text-[#222222]">Your cart is empty</p>
              <p className="text-[13px] text-[#888888]">Add some items to get started!</p>
              <button
                className="mt-2 py-3 px-7 bg-[#c084a0] text-white rounded-lg text-sm font-semibold transition-colors hover:bg-[#a8607e]"
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="pt-2">
              {lines.map(line => {
                const img = line.merchandise.product?.images?.edges?.[0]?.node;
                const variantName = line.merchandise.title !== 'Default Title' ? line.merchandise.title : '';
                const lineTotal = (parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2);

                // ── Gift card detection ──
                const isGiftCard = line.merchandise.product?.title?.toLowerCase().includes('gift card');
                // Filter to only attributes with values, skip internal underscore keys
                const visibleAttrs = (line.attributes || []).filter(
                  a => a.value?.trim() && !a.key.startsWith('_')
                );

                return (
                  <div key={line.id} className="flex gap-3.5 py-4 border-b border-[#f2f2f2]">
                    <div className="w-[90px] h-[110px] rounded-lg overflow-hidden flex-shrink-0 bg-[#f5f5f5]">
                      {img
                        ? <img
                            src={img.url}
                            alt={img.altText || line.merchandise.product?.title || 'Cart item'}
                            className={`w-full h-full ${isGiftCard ? 'object-contain p-1 bg-white' : 'object-cover'}`}
                          />
                        : <div className="w-full h-full bg-[#ece6ea]" />
                      }
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-sm font-medium text-[#1a1a1a] leading-[1.4] flex-1">
                          {line.merchandise.product?.title}
                        </p>
                        <button
                          className="text-xs text-[#888888] underline whitespace-nowrap transition-colors hover:text-[#c084a0] flex-shrink-0"
                          onClick={() => removeItem(line.id)}
                          aria-label="Remove"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Variant label — "Value:" for gift cards, "Size:" for everything else */}
                      {variantName && (
                        <p className="text-xs text-[#777777]">
                          {isGiftCard ? 'Value' : 'Size'}: {variantName}
                        </p>
                      )}

                      {/* ── Gift card personalization attributes ── */}
                      {visibleAttrs.length > 0 && (
                        <div className="mt-1 rounded-md bg-[#fff8fb] border border-pink-100 px-2.5 py-2 space-y-1">
                          {visibleAttrs.map(attr => (
                            <p key={attr.key} className="text-[11px] text-[#6b4352] leading-snug">
                              <span className="font-semibold">{attr.key}:</span>{' '}
                              <span>{attr.value}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex items-center border-[1.5px] border-[#dddddd] rounded-[6px] overflow-hidden">
                          <button
                            className="w-8 h-8 text-[17px] text-[#444444] bg-white transition-colors hover:bg-[#f5f5f5] disabled:opacity-40 flex items-center justify-center"
                            onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                            disabled={loading}
                            aria-label="Decrease"
                          >−</button>
                          <span className="w-[34px] text-center text-sm font-semibold text-[#1a1a1a] border-x-[1.5px] border-[#dddddd] leading-8">
                            {line.quantity}
                          </span>
                          <button
                            className="w-8 h-8 text-[17px] text-[#444444] bg-white transition-colors hover:bg-[#f5f5f5] disabled:opacity-40 flex items-center justify-center"
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={loading}
                            aria-label="Increase"
                          >+</button>
                        </div>
                        <p className="text-[15px] font-semibold text-[#1a1a1a]">
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

        {/* Footer */}
        {lines.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[#f0f0f0] bg-[#fff8fb] px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <div className="flex justify-between text-base font-bold text-[#1a1a1a] pb-1">
              <span>SUBTOTAL</span>
              <span>{formatPrice(totalPrice, currencyCode)}</span>
            </div>

            <p className="rounded-lg bg-[#f8f2f5] px-3 py-2 text-xs leading-5 text-[#6b4352]">
              Shipping, taxes, gift cards, and discount codes are handled securely at checkout.
            </p>

            <button
              className="flex w-full items-center justify-center gap-2 py-4 bg-pink text-white rounded-xl text-[15px] font-bold tracking-[0.03em] transition-all hover:bg-pink-dark shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={checkoutDisabled}
              onClick={handleCheckout}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
              </svg>
              {loading ? 'Updating...' : 'Secure Checkout'}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-[#777777]">
              <Link to="/cart" className="underline transition-colors hover:text-[#c084a0]" onClick={closeCart}>
                View cart
              </Link>
              <button className="underline transition-colors hover:text-[#c084a0]" onClick={closeCart}>
                Continue shopping
              </button>
            </div>

            <PaymentMethods />
          </div>
        )}

      </div>
    </>
  );
}