"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 🛒 Cart-д байх item-ийн төрөл
type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Context төрлүүд
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
};

// Context үүсгэх
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      return [...prev, { ...item, _id: item._id + "-" + new Date().getTime() }];
    });
  };
  

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Context ашиглах hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
