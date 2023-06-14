import { createSlice } from '@reduxjs/toolkit';

type UiStateType = {
  cartIsVisible: boolean;
};

const initialState: UiStateType = { cartIsVisible: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const { toggle } = uiSlice.actions;

export default uiSlice.reducer;

export type UiAction = ReturnType<typeof toggle>;
export type UiState = ReturnType<typeof uiSlice.reducer>;
