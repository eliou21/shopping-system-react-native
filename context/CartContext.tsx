import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
};

type CartContextType = {
  cart: CartItem[];
  checkoutCart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
  proceedToCheckout: () => void;
  checkout: (nav?: any) => void;  
  clearCheckoutCart: (nav?: any) => void; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutCart, setCheckoutCart] = useState<CartItem[]>([]);
  const navigation = useNavigation();

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const proceedToCheckout = () => {
    setCheckoutCart([...cart]);
  };

  const checkout = (nav?: any) => {
    setCart([]); 
    setCheckoutCart([]); 
    (nav || navigation).navigate("Home"); 
  };

  const clearCheckoutCart = (nav?: any) => {
    setCheckoutCart([]); 
    (nav || navigation).navigate("Cart");  
  };

  return (
    <CartContext.Provider
      value={{ cart, checkoutCart, addToCart, updateQuantity, removeFromCart, proceedToCheckout, checkout, clearCheckoutCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
