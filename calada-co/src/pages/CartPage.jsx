import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../services/shopify'
import PaymentMethods from '../components/cart/PaymentMethods'

export function CartPage() {
  const { cart, updateItem, removeItem, checkoutUrl, totalPrice, currencyCode, loading } = useCart()
  const lines = cart?.lines?.edges ?? []
  const subtotal = cart?.cost?.subtotalAmount ?? { amount: totalPrice, currencyCode }
  const canCheckout = lines.length > 0 && checkoutUrl && checkoutUrl !== '#'

  const FREE_THRESHOLD = 65
  const subtotalNum = parseFloat(subtotal.amount) || 0
  const remaining = Math.max(0, FREE_THRESHOLD - subtotalNum)
  const progressPct = Math.min(100, (subtotalNum / FREE_THRESHOLD) * 100)
  const qualifies = subtotalNum >= FREE_THRESHOLD

  return (
    <div className="bg-[#fbf7f9] min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-pink">Shopping Bag</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-navy sm:text-5xl">Your Cart</h1>
          </div>
          <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.18em] text-navy underline decoration-2 underline-offset-4 transition-colors hover:text-pink">
            Continue shopping
          </Link>
        </div>

        {lines.length === 0 ? (
          <div className="rounded-2xl border border-pink-light bg-white px-5 py-20 text-center shadow-sm">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-light mx-auto mb-5">
              <svg width="28" height="28" fill="none" stroke="#D4537E" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="font-serif text-2xl font-semibold text-navy">Your cart is empty.</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Start with new arrivals, family sets, or customer favorites.
            </p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full bg-pink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-pink-dark shadow-sm">
              Shop now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">

            {/* ITEMS */}
            <div className="space-y-4">
              {/* Free shipping progress */}
              <div className="rounded-xl bg-white border border-pink-light px-5 py-4 shadow-sm">
                {qualifies ? (
                  <p className="text-[13px] text-[#2a7a2a] mb-2 font-medium text-center">
                    You've qualified for <strong>free shipping.</strong>
                  </p>
                ) : (
                  <p className="text-[13px] text-slate-600 mb-2 text-center">
                    Add <strong className="text-pink">{formatPrice(remaining, currencyCode)}</strong> more for free shipping
                  </p>
                )}
                <div className="h-2 bg-pink-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink to-pink-mid rounded-full transition-[width] duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {lines.map(({ node: line }) => {
                const { merchandise } = line
                const img = merchandise.product?.images?.edges?.[0]?.node
                return (
                  <div key={line.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:gap-5 sm:p-5">
                    {img ? (
                      <img
                        src={img.url}
                        alt={img.altText || merchandise.product?.title || 'Cart item'}
                        className="h-28 w-24 flex-shrink-0 rounded-xl bg-pink-light object-cover sm:h-32 sm:w-28"
                      />
                    ) : (
                      <div className="h-28 w-24 flex-shrink-0 rounded-xl bg-pink-light sm:h-32 sm:w-28" />
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold leading-5 text-navy sm:text-base">{merchandise.product?.title}</p>
                          {merchandise.title !== 'Default Title' && (
                            <p className="mt-1 text-xs text-slate-400">{merchandise.title}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(line.id)}
                          className="shrink-0 text-[11px] font-semibold text-slate-300 transition-colors hover:text-red-400"
                        >
                          remove
                        </button>
                      </div>
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                        <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                          <button
                            onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                            disabled={loading}
                            className="grid h-9 w-9 place-items-center text-base text-slate-600 transition-colors hover:bg-pink-light hover:text-pink disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >−</button>
                          <span className="grid h-9 min-w-9 place-items-center border-x border-slate-200 px-3 text-sm font-bold text-navy">{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="grid h-9 w-9 place-items-center text-base text-slate-600 transition-colors hover:bg-pink-light hover:text-pink disabled:opacity-40"
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                        <p className="text-sm font-bold text-navy">
                          {formatPrice(Number(merchandise.price.amount) * line.quantity, merchandise.price.currencyCode)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ORDER SUMMARY */}
            <aside className="h-fit rounded-2xl border border-pink-light bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl font-bold text-navy mb-5">Order Summary</h2>

              <div className="space-y-3 border-b border-slate-100 pb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-navy">{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Discount</span>
                  <span className="font-medium text-slate-400">Applied at checkout</span>
                </div>
              </div>

              <div className="flex justify-between py-5 text-base font-black text-navy">
                <span>Total</span>
                <span>{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
              </div>

              <a
                href={canCheckout ? checkoutUrl : undefined}
                aria-disabled={!canCheckout}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-center text-sm font-bold tracking-wide transition-all ${
                  canCheckout
                    ? 'bg-pink text-white hover:bg-pink-dark shadow-md hover:shadow-lg active:scale-[0.98]'
                    : 'pointer-events-none bg-slate-200 text-slate-400'
                }`}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
                </svg>
                Secure Checkout
              </a>

              <p className="mt-4 rounded-xl bg-[#f8f2f5] px-4 py-3 text-xs leading-5 text-[#6b4352]">
                Payments, shipping, taxes, and gift cards are completed securely through Shopify.
              </p>

              <PaymentMethods className="mt-5" />
            </aside>

          </div>
        )}

      </div>
    </div>
  )
}

export default CartPage
