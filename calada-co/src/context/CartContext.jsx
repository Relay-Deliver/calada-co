import { createContext, useContext, useEffect, useState } from 'react'
import { createCart, getCart, addToCart, updateCartLine, removeFromCart } from '../services/shopify'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedCartId = localStorage.getItem('calada_cart_id')
    if (savedCartId) {
      getCart(savedCartId).then(setCart).catch(() => initCart())
    } else {
      initCart()
    }
  }, [])

  async function initCart() {
    const newCart = await createCart()
    setCart(newCart)
    localStorage.setItem('calada_cart_id', newCart.id)
  }

  async function addItem(variantId, quantity = 1) {
    setLoading(true)
    try {
      const updated = await addToCart(cart.id, [{ merchandiseId: variantId, quantity }])
      setCart(updated)
      setIsOpen(true)
    } finally {
      setLoading(false)
    }
  }

  async function updateItem(lineId, quantity) {
    setLoading(true)
    try {
      const updated = await updateCartLine(cart.id, [{ id: lineId, quantity }])
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  async function removeItem(lineId) {
    setLoading(true)
    try {
      const updated = await removeFromCart(cart.id, [lineId])
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const itemCount = cart?.lines?.edges?.reduce((sum, { node }) => sum + node.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{ cart, isOpen, setIsOpen, loading, addItem, updateItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
