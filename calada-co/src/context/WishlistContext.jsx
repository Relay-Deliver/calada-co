import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

function getStored() {
  try {
    return JSON.parse(localStorage.getItem('calada_wishlist') || '[]');
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getStored);

  useEffect(() => {
    localStorage.setItem('calada_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);