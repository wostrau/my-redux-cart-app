import {
  PayloadAction,
  createSlice,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

export type NotificationType = {
  status: string;
  title: string;
  message: string;
};

type UiStateType = {
  cartIsVisible: boolean;
  notification: null | NotificationType;
};

const initialState: UiStateType = {
  cartIsVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle: (state) => {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const { toggle, showNotification } = uiSlice.actions as {
  toggle: ActionCreatorWithPayload<void, string>;
  showNotification: ActionCreatorWithPayload<NotificationType, string>;
};

export default uiSlice.reducer;

type ToggleAction = typeof uiSlice.actions.toggle;
type ShowNotificationAction = PayloadAction<NotificationType>;
export type UiActions = ToggleAction | ShowNotificationAction;
export type UiState = ReturnType<typeof uiSlice.reducer>;
