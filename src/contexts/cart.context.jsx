const { createContext, useState, useEffect } = require("react");

const addCartItem = (cartItems, productToAdd) => {
  if (cartItems.has(productToAdd.id)) {
    const item = cartItems.get(productToAdd.id);
    cartItems.set(productToAdd.id, { ...item, quantity: item.quantity + 1 });
    return new Map(cartItems);
  }

  return new Map(
    cartItems.set(productToAdd.id, { ...productToAdd, quantity: 1 })
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  if (cartItems.has(productToRemove.id)) {
    const item = cartItems.get(productToRemove.id);
    if (item.quantity > 1) {
      cartItems.set(productToRemove.id, {
        ...item,
        quantity: item.quantity - 1,
      });
    } else {
      cartItems.delete(item.id);
    }
    return new Map(cartItems);
  }
  return cartItems;
};

const clearCartItem = (cartItems, productToClear) => {
  if (cartItems.has(productToClear.id)) {
    cartItems.delete(productToClear.id);
    return new Map(cartItems);
  }
  return cartItems;
};

export const CartContext = createContext({
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: true,
  setIsCartOpen: () => {},
  getCartItems: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(new Map());
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newCartTotal = getCartItems().reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = getCartItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const getCartItems = () => {
    return [...cartItems.values()];
  };
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    getCartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
