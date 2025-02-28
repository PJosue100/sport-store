import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addProduct = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.idProducto === product.idProducto);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.idProducto === product.idProducto ? { ...p, cantidad: p.cantidad + product.cantidad } : p
        );
      }
      return [...prevCart, product];
    });
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  const removeProduct = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((p) => p.idProducto !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((p) =>
        p.idProducto === productId ? { ...p, cantidad: quantity } : p
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}