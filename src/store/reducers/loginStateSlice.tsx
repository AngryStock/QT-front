import { createSlice } from '@reduxjs/toolkit';

export const loginStateSlice = createSlice({
  name: 'loginState',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
  },
});

export const { login } = loginStateSlice.actions;

export default loginStateSlice.reducer;
