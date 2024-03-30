import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Category {
  id: string;
  name: string;
}

export const categorysSlice = createSlice({
  name: 'categorys',
  initialState: [
    { id: '0', name: '샌드위치15cm 세트' },
    { id: '1', name: '샌드위치15cm 단품' },
    { id: '2', name: '샌드위치30cm 세트' },
    { id: '3', name: '샌드위치30cm 단품' },
  ],
  reducers: {
    addCategory(state, action) {
      const categroyNames = action.payload.split(',');
      const newcategorys = [];
      for (let i = 0; i < categroyNames.length; i++) {
        newcategorys.push({ id: uuidv4(), name: categroyNames[i] });
      }

      return [...state, ...newcategorys];
    },
    deleteCategory(state, action) {
      const targetIndex = state.findIndex((category) => category.id === action.payload);
      state.splice(targetIndex, 1);
    },
  },
});

export const { addCategory, deleteCategory } = categorysSlice.actions;

export default categorysSlice.reducer;
