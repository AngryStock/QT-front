import { createSlice } from '@reduxjs/toolkit';

export interface Options {
  categoryId: string;
  menuId: string;
  title: string;
  essential: boolean;
  only: boolean;
  optionLists: OptionLists[];
}
export interface OptionLists {
  id: string;
  optionId: string;
  name: string;
  price: number;
  selected: boolean;
}

const initialState: Options[] = [];

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOption(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    optionSelectedHandler(state, action) {
      const targetState = state.find((option) => option.categoryId === action.payload.optionId);
      if (targetState) {
        if (targetState.only) {
          targetState.optionLists.forEach((optionList, i) => {
            if (i === action.payload.index) {
              optionList.selected = true;
            } else {
              optionList.selected = false;
            }
          });
        } else {
          targetState.optionLists[action.payload.index].selected =
            !targetState?.optionLists[action.payload.index].selected;
        }
      }
    },
    addCategoryOfOptions(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.push({
          categoryId: action.payload[i].id,
          menuId: action.payload[i].menuId,
          title: action.payload[i].name,
          essential: action.payload[i].essential,
          only: action.payload[i].only,
          optionLists: [],
        });
      }
    },
    deleteCategoryOfOptions(state, action) {
      const targetOptionIndex = state.findIndex((option) => option.categoryId === action.payload);
      state.splice(targetOptionIndex, 1);
    },
    addOptionLists(state, action) {
      const targetOption = state.find((option) => option.categoryId === action.payload.optionId);
      if (targetOption) {
        for (let i = 0; i < action.payload.value.length; i++) {
          targetOption.optionLists.push(action.payload.value[i]);
        }
      }
    },
    deleteOptionList(state, action) {
      const targetOption = state.find((option) => option.categoryId === action.payload.optionId);
      if (targetOption) {
        targetOption.optionLists.splice(action.payload.index, 1);
      }
    },
    checkHnadler(state, action) {
      const target = state.find((option) => option.categoryId === action.payload.optionId);
      if (target) {
        if (action.payload.checked === 'only') {
          target.only = action.payload.value;
        } else if (action.payload.checked === 'essential') {
          target.essential = action.payload.value;
        }
      }
    },
    changePrice(state, action) {
      const targetOption = state.find((option) => option.categoryId === action.payload.optionId);
      if (targetOption) {
        targetOption.optionLists[action.payload.index].price = action.payload.price;
      }
    },
  },
});

export const {
  optionSelectedHandler,
  addCategoryOfOptions,
  addOptionLists,
  checkHnadler,
  changePrice,
  deleteCategoryOfOptions,
  deleteOptionList,
  setOption,
} = optionsSlice.actions;

export default optionsSlice.reducer;
