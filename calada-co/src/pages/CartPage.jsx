// CartPage.jsx
import { useCart } from '../context/CartContext'
import { formatPrice } from '../services/shopify'

export function CartPage() {
  const { cart, updateItem, removeItem } = useCart()
  const lines = cart?.lines?.edges ?? []
  const subtotal = cart?.cost?.subtotalAmount

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-medium text-navy mb-8">your cart</h1>
      {lines.length === 0 ? (
        <p className="text-gray-400 text-sm py-16 text-center">your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {lines.map(({ node: line }) => {
              const { merchandise } = line
              const img = merchandise.product?.images?.edges?.[0]?.node
              return (
                <div key={line.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl">
                  {img && <img src={img.url} alt={img.altText} className="w-20 h-20 object-cover rounded-lg bg-pink-light" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy">{merchandise.product?.title}</p>
                    <p className="text-xs text-gray-400 mb-2">{merchandise.title}</p>
                    <p className="text-sm text-pink">{formatPrice(merchandise.price.amount)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)} className="w-7 h-7 rounded-full border border-gray-200 text-sm hover:border-pink hover:text-pink transition-colors">−</button>
                      <span className="text-sm">{line.quantity}</span>
                      <button onClick={() => updateItem(line.id, line.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-200 text-sm hover:border-pink hover:text-pink transition-colors">+</button>
                      <button onClick={() => removeItem(line.id)} className="ml-auto text-xs text-gray-300 hover:text-red-400 transition-colors">remove</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 h-fit">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">subtotal</span>
              <span className="font-medium text-navy">{subtotal ? formatPrice(subtotal.amount) : '—'}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6">shipping calculated at checkout</p>
            <a href={cart?.checkoutUrl} className="block w-full text-center bg-navy text-white py-3 rounded-full text-sm font-medium hover:bg-navy-mid transition-colors">
              proceed to checkout
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
