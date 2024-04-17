import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Orders {
  id: string;
  table: string;
  price: number;
  menus: Menu[];
  status: string;
  date: string;
}

export interface Menu {
  name: string;
  options: string[];
  amount: number;
}

export const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    addOrder(state: Orders[], action) {
      state.push({
        id: uuidv4(),
        table: action.payload.table,
        price: action.payload.price,
        menus: action.payload.menus,
        status: 'Waiting',
        date: new Date().toISOString(),
      });
    },
    deleteOrder(state: Orders[], action) {
      const targetIndex = state.findIndex((state) => state.id === action.payload);
      state.splice(targetIndex, 1);
    },
    setStatus(state: Orders[], action) {
      const targetState = state.find((state) => state.id === action.payload.id);
      if (targetState) {
        targetState.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, deleteOrder, setStatus } = orderSlice.actions;

export default orderSlice.reducer;
