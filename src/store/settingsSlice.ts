import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../types/game';

const initialState: Settings = {
  soundEnabled: true,
  vibrationEnabled: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleVibration: (state) => {
      state.vibrationEnabled = !state.vibrationEnabled;
    },
    setSound: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload;
    },
    setVibration: (state, action: PayloadAction<boolean>) => {
      state.vibrationEnabled = action.payload;
    }
  }
});

export const {
  toggleSound,
  toggleVibration,
  setSound,
  setVibration
} = settingsSlice.actions;

export default settingsSlice.reducer;
