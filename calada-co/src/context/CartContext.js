import { createContext, useContext, useEffect, useState } from 'react';
import { createCart, addToCart, updateCartLine, removeFromCart, getCart } from '../services/shopify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCartId = localStorage.getItem('calada_cart_id');
    if (savedCartId) {
      getCart(savedCartId).then(setCart).catch(() => localStorage.removeItem('calada_cart_id'));
    }
  }, []);

  const getOrCreateCart = async () => {
    if (cart) return cart;
    const newCart = await createCart();
    localStorage.setItem('calada_cart_id', newCart.id);
    setCart(newCart);
    return newCart;
  };

  const addItem = async (variantId, quantity = 1) => {
    setLoading(true);
    try {
      const currentCart = await getOrCreateCart();
      const updated = await addToCart(currentCart.id, variantId, quantity);
      setCart(updated);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (lineId, quantity) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (lineId) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await removeFromCart(cart.id, [lineId]);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const itemCount = cart?.lines?.edges?.reduce((sum, { node }) => sum + node.quantity, 0) || 0;
  const totalPrice = cart?.cost?.totalAmount?.amount || '0.00';
  const currencyCode = cart?.cost?.totalAmount?.currencyCode || 'USD';
  const checkoutUrl = cart?.checkoutUrl || '#';

  return (
    <CartContext.Provider value={{
      cart, isOpen, loading, itemCount, totalPrice, currencyCode, checkoutUrl,
      addItem, updateItem, removeItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
