import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
