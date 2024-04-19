import { createSlice } from '@reduxjs/toolkit';

// const arraysHaveSameElements = (a: Array<string>, b: Array<string>) => {
//   if (a.length != b.length) {
//     return false;
//   }

//   for (let i = 0; i < a.length; i++) {
//     if (a[i] != b[i]) {
//       return false;
//     }
//   }

//   return true;
// };

export interface Cart {
  id: string;
  table: string;
  menuId: string;
  name: string;
  img: string;
  options: string[];
  price: number;
  amount: number;
}

const initialState: Cart[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addCart(state, action) {
      state.push(action.payload);
    },
    deleteCart(state, action) {
      const targetIndex = state.findIndex((item) => item.id === action.payload);
      state.splice(targetIndex, 1);
    },
    setCartAmount(state, action) {
      const target = state.find((item) => item.id === action.payload.id);
      if (target) {
        target.amount = action.payload.amount;
      }
    },
    setCart(state, action) {
      return action.payload;
    },
    deleteAllCart() {
      return [];
    },
  },
});

export const { addCart, setCartAmount, deleteCart, deleteAllCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
