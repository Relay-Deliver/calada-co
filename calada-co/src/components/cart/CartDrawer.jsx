import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../services/shopify'

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateItem, removeItem, itemCount } = useCart()
  const lines = cart?.lines?.edges ?? []
  const subtotal = cart?.cost?.subtotalAmount

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-navy">
            your cart {itemCount > 0 && <span className="text-pink">({itemCount})</span>}
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-navy transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
              </svg>
              <p className="text-sm">your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map(({ node: line }) => {
                const { merchandise } = line
                const img = merchandise.product?.images?.edges?.[0]?.node
                return (
                  <div key={line.id} className="flex gap-4 py-4 border-b border-gray-50">
                    {img && (
                      <img src={img.url} alt={img.altText} className="w-20 h-20 object-cover rounded-lg bg-pink-light" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-navy truncate">{merchandise.product?.title}</p>
                      <p className="text-xs text-gray-400 mb-2">{merchandise.title}</p>
                      <p className="text-sm text-pink font-medium">{formatPrice(merchandise.price.amount)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-pink hover:text-pink transition-colors"
                        >−</button>
                        <span className="text-sm w-4 text-center">{line.quantity}</span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-pink hover:text-pink transition-colors"
                        >+</button>
                        <button
                          onClick={() => removeItem(line.id)}
                          className="ml-auto text-xs text-gray-300 hover:text-red-400 transition-colors"
                        >remove</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-6 py-6 border-t border-gray-100">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-500">subtotal</span>
              <span className="font-medium text-navy">{subtotal ? formatPrice(subtotal.amount) : '—'}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">shipping and taxes calculated at checkout</p>
            <a
              href={cart?.checkoutUrl}
              className="block w-full text-center bg-navy text-white py-3 rounded-full font-medium text-sm hover:bg-navy-mid transition-colors"
            >
              checkout
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-sm text-gray-400 hover:text-navy mt-3 transition-colors"
            >
              continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
