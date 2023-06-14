import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './ui-slice';
import cartReducer from './cart-slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export default store;
