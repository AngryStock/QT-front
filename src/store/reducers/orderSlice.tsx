import { createSlice } from '@reduxjs/toolkit';

export interface Orders {
  id: string;
  table: string;
  storeId: string;
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

const initialState: Orders[] = [];

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action) {
      return action.payload;
    },
    addOrder(state, action) {
      state.push({
        id: action.payload.id,
        table: action.payload.table,
        storeId: action.payload.storeId,
        price: action.payload.price,
        menus: action.payload.menus,
        status: action.payload.status,
        date: action.payload.date,
      });
    },
    deleteOrder(state, action) {
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

export const { addOrder, deleteOrder, setStatus, setOrder } = orderSlice.actions;

export default orderSlice.reducer;
