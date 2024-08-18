"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContext = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (
    id: number,
    title: string,
    price: number,
    image: string,
    description: string
  ) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  getTotalQuantity: () => number;
  getTotalCost: () => number;
};

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
};

function getInitialCartState() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
}

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    getInitialCartState || []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(
    id: number,
    title: string,
    price: number,
    image: string,
    description: string
  ) {
    setCartItems((currentItems) =>
      !currentItems.find((item) => item.id === id)
        ? [
            ...currentItems,
            { id, title, price, image, description, quantity: 1 },
          ]
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
    );
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currentItems) =>
      currentItems.find((item) => item.id === id)?.quantity === 1
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
    );
  }

  function removeItem(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function getTotalQuantity() {
    const totalQuantity = cartItems?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalQuantity;
  }

  function getTotalCost() {
    const totalCost = cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalCost;
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        getTotalQuantity,
        getTotalCost,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
