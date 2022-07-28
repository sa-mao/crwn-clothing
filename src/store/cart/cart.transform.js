import { createTransform } from "redux-persist";

export const MapTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert myMap to an Array.
    return { ...inboundState, cartItems: [...inboundState.cartItems] };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert myMap back to a Map.
    return { ...outboundState, cartItems: new Map(outboundState.cartItems) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ["cart"] }
);
