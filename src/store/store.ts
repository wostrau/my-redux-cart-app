import { configureStore } from '@reduxjs/toolkit';

import uiReducer, { UiActions } from './ui-slice';
import cartReducer, { CartActions } from './cart-slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootActions = CartActions | UiActions;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
