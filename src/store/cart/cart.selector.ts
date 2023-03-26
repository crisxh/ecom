import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";

const selectCartReducer = (state): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart): CartItem[] => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart): boolean => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number => cartItems.reduce(
    (total, currItem) => total + currItem.quantity,
    0
  )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems): number => cartItems.reduce(
    (cartTotal, currItem) => cartTotal + currItem.price * currItem.quantity,
    0
  )
);