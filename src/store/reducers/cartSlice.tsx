import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const arraysHaveSameElements = (a: Array<string>, b: Array<string>) => {
  if (a.length != b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
};

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

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [
    {
      id: '0',
      table: '7',
      menuId: '0',
      name: '스파이시 이탈리안 (15cm세트)',
      img: '/images/spicy_italian_15cm_set.png',
      options: ['화이트', '아메리칸치즈', '토스팅', '더블초코 칩 쿠키', '코카콜라 (355ml)'],
      price: 9500,
      amount: 2,
    },
  ],
  reducers: {
    addCart(state, action) {
      console.log(action.payload);
      const targets = state.filter((item) => item.menuId === action.payload.menuId);
      if (targets) {
        const target = targets.find((item) => arraysHaveSameElements(item.options, action.payload.options));
        if (target) {
          target.amount++;
        } else {
          state.push({
            id: uuidv4(),
            table: action.payload.table,
            menuId: action.payload.menuId,
            name: action.payload.name,
            options: action.payload.options,
            img: action.payload.img,
            price: action.payload.price,
            amount: action.payload.amount,
          });
        }
      }
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
    deleteAllCart() {
      return [];
    },
  },
});

export const { addCart, setCartAmount, deleteCart, deleteAllCart } = cartSlice.actions;

export default cartSlice.reducer;
