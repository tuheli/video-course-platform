import { AlertProps } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  severity: AlertProps['severity'];
}

const initialState: NotificationState = {
  message: '',
  severity: 'info',
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notified: (state, action: PayloadAction<NotificationState>) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    removedNotification: (state) => {
      state.message = '';
    },
  },
});

export const { notified, removedNotification } = slice.actions;
export default slice.reducer;
