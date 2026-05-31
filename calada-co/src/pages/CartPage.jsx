import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../services/shopify'
import PaymentMethods from '../components/cart/PaymentMethods'

export function CartPage() {
  const { cart, updateItem, removeItem, checkoutUrl, totalPrice, currencyCode, loading } = useCart()
  const lines = cart?.lines?.edges ?? []
  const subtotal = cart?.cost?.subtotalAmount ?? { amount: totalPrice, currencyCode }
  const canCheckout = lines.length > 0 && checkoutUrl && checkoutUrl !== '#'

  return (
    <div className="bg-[#fbf7f9] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
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
          <div className="rounded-xl border border-pink-light bg-white px-5 py-16 text-center shadow-sm">
            <p className="font-serif text-3xl font-semibold text-navy">Your cart is empty.</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Start with new arrivals, family sets, or customer favorites.
            </p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full bg-pink px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-pink-dark">
              Shop now
            </Link>
          </div>
      ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
            <div className="space-y-3 sm:space-y-4">
            {lines.map(({ node: line }) => {
              const { merchandise } = line
              const img = merchandise.product?.images?.edges?.[0]?.node
              return (
                  <div key={line.id} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:grid-cols-[108px_minmax(0,1fr)] sm:p-4">
                    {img ? (
                      <img src={img.url} alt={img.altText || merchandise.product?.title || 'Cart item'} className="h-28 w-full rounded-lg bg-pink-light object-cover sm:h-32" />
                    ) : (
                      <div className="h-28 rounded-lg bg-pink-light sm:h-32" />
                    )}
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-bold leading-5 text-navy sm:text-base">{merchandise.product?.title}</p>
                          {merchandise.title !== 'Default Title' && (
                            <p className="mt-1 text-xs text-slate-400">{merchandise.title}</p>
                          )}
                        </div>
                        <button onClick={() => removeItem(line.id)} className="text-xs font-semibold text-slate-300 transition-colors hover:text-red-400">
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
                          >
                            −
                          </button>
                          <span className="grid h-9 min-w-9 place-items-center border-x border-slate-200 px-3 text-sm font-bold text-navy">{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={loading}
                            className="grid h-9 w-9 place-items-center text-base text-slate-600 transition-colors hover:bg-pink-light hover:text-pink disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
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

            <aside className="h-fit rounded-xl border border-pink-light bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-navy">Order summary</h2>
              <div className="mt-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-navy">{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="font-medium text-slate-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Discount codes</span>
                  <span className="font-medium text-slate-400">Applied at checkout</span>
                </div>
              </div>

              <div className="flex justify-between py-5 text-base font-black text-navy">
                <span>Total today</span>
                <span>{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
              </div>

              <a
                href={canCheckout ? checkoutUrl : undefined}
                aria-disabled={!canCheckout}
                className={`block w-full rounded-full py-3.5 text-center text-sm font-bold transition-colors ${canCheckout ? 'bg-navy text-white hover:bg-pink' : 'pointer-events-none bg-slate-200 text-slate-400'}`}
              >
                Secure checkout
              </a>

              <p className="mt-3 rounded-lg bg-[#f8f2f5] px-3 py-2 text-xs leading-5 text-[#6b4352]">
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
