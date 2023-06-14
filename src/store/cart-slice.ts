import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

interface AddItemPayload {
  id: string;
  title: string;
  price: number;
}

interface RemoveItemPayload {
  itemId: string;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  } as CartState,
  reducers: {
    addItemToCart(state, action: PayloadAction<AddItemPayload>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.totalQuantity++;
    },
    removeItemFromCart(state, action: PayloadAction<RemoveItemPayload>) {
      const id = action.payload.itemId;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;

export type CartStateType = CartState;
export type CartItemType = CartItem;

type AddItemToCartAction = PayloadAction<AddItemPayload>;
type RemoveItemFromCartAction = PayloadAction<RemoveItemPayload>;
export type CartActions = AddItemToCartAction | RemoveItemFromCartAction;
