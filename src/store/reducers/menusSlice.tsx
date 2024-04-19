import { createSlice } from '@reduxjs/toolkit';

export interface Menus {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  menuImageUrl: string;
}

export const menusSlice = createSlice({
  name: 'menus',
  initialState: [],
  reducers: {
    setMenu(state, action) {
      return action.payload;
    },
    addMenu(state: Menus[], action) {
      state.push(action.payload);
    },
    deleteMenu(state: Menus[], action) {
      const targetIndex = state.findIndex((menu) => menu.id === action.payload);
      state.splice(targetIndex, 1);
    },
  },
});

export const { setMenu, deleteMenu, addMenu } = menusSlice.actions;

export default menusSlice.reducer;
