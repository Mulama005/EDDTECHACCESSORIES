import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('edd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('edd_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedStorage, selectedColor, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.id === product.id &&
          item.basePath === product.basePath &&
          item.selectedStorage === selectedStorage &&
          item.selectedColor === selectedColor
      );

      if (existingIndex !== -1) {
        // Update quantity if same product + same options
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      // Add new item
      return [
        ...prev,
        {
          cartId: `${product.id}_${selectedStorage}_${selectedColor}_${Date.now()}`,
          id: product.id,
          basePath: product.basePath,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedStorage,
          selectedColor,
          quantity,
          whatsappNumber: product.whatsappNumber,
        }
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('edd_cart');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + num * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}