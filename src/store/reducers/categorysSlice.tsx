import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Category {
  id: string;
  storeId: string;
  name: string;
}

export const categorysSlice = createSlice({
  name: 'categorys',
  initialState: [],
  reducers: {
    setCategory(state, action) {
      return action.payload;
    },
    addCategory(state: Category[], action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.push(action.payload[i]);
      }
    },
    deleteCategory(state: Category[], action) {
      const targetIndex = state.findIndex((category) => category.id === action.payload);
      state.splice(targetIndex, 1);
    },
  },
});

export const { addCategory, deleteCategory, setCategory } = categorysSlice.actions;

export default categorysSlice.reducer;
