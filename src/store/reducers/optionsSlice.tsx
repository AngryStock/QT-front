import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Options {
  id: string;
  menuId: string;
  title: string;
  essential: boolean;
  only: boolean;
  optionLists: OptionLists[];
}
export interface OptionLists {
  id: string;
  optionID: string;
  name: string;
  price: number;
  isSelected: boolean;
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState: [
    {
      id: '0',
      menuId: '0',
      title: '빵선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '0', optionId: '0', name: '화이트', price: 0, isSelected: false },
        { id: '2', optionId: '0', name: '위트', price: 0, isSelected: false },
        { id: '3', optionId: '0', name: '허니오트', price: 0, isSelected: false },
        { id: '4', optionId: '0', name: '플랫브레드', price: 0, isSelected: false },
      ],
    },
    {
      id: '1',
      menuId: '0',
      title: '치즈선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '5', optionId: '1', name: '아메리칸치즈', price: 0, isSelected: false },
        { id: '6', optionId: '1', name: '슈레드치즈', price: 0, isSelected: false },
        { id: '7', optionId: '1', name: '모차렐라치즈', price: 0, isSelected: false },
        { id: '8', optionId: '1', name: '치즈제외', price: 0, isSelected: false },
      ],
    },
    {
      id: '2',
      menuId: '0',
      title: '미트추가',
      essential: false,
      only: false,
      optionLists: [{ id: '9', optionId: '2', name: '미트추가(동일미트)', price: 3000, isSelected: false }],
    },
    {
      id: '3',
      menuId: '0',
      title: '치즈추가',
      essential: false,
      only: false,
      optionLists: [{ id: '10', optionId: '3', name: '치즈추가(동일치즈)', price: 1400, isSelected: false }],
    },
    {
      id: '4',
      menuId: '0',
      title: '재료추가',
      essential: false,
      only: false,
      optionLists: [
        { id: '11', optionId: '4', name: '에그마요', price: 2000, isSelected: false },
        { id: '12', optionId: '4', name: '페페로니', price: 1400, isSelected: false },
        { id: '13', optionId: '4', name: '베이컨', price: 1500, isSelected: false },
        { id: '14', optionId: '4', name: '아보카도', price: 1500, isSelected: false },
        { id: '15', optionId: '4', name: '오믈렛', price: 1800, isSelected: false },
      ],
    },
    {
      id: '5',
      menuId: '0',
      title: '빵/미트 토스팅 선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '16', optionId: '5', name: '토스팅', price: 0, isSelected: false },
        { id: '17', optionId: '5', name: '토스팅 안함', price: 0, isSelected: false },
      ],
    },
    {
      id: '6',
      menuId: '0',
      title: '야채 제외',
      essential: false,
      only: false,
      optionLists: [
        { id: '18', optionId: '6', name: '양상추 제외', price: 0, isSelected: false },
        { id: '19', optionId: '6', name: '토마토 제외', price: 0, isSelected: false },
        { id: '20', optionId: '6', name: '오이 제외', price: 0, isSelected: false },
        { id: '21', optionId: '6', name: '피망 제외', price: 0, isSelected: false },
        { id: '22', optionId: '6', name: '양파 제외', price: 0, isSelected: false },
        { id: '23', optionId: '6', name: '피클 제외', price: 0, isSelected: false },
        { id: '24', optionId: '6', name: '올리브 제외', price: 0, isSelected: false },
        { id: '25', optionId: '6', name: '할라피뇨 제외', price: 0, isSelected: false },
      ],
    },
    {
      id: '7',
      menuId: '0',
      title: '소스선택 *미선택시 추천소스 제공',
      essential: false,
      only: false,
      optionLists: [
        { id: '26', optionId: '7', name: '추천소스', price: 0, isSelected: false },
        { id: '27', optionId: '7', name: '소스 넣지않음', price: 0, isSelected: false },
        { id: '28', optionId: '7', name: '랜치', price: 0, isSelected: false },
        { id: '29', optionId: '7', name: '스위트 어니언', price: 0, isSelected: false },
        { id: '30', optionId: '7', name: '마요네즈', price: 0, isSelected: false },
        { id: '31', optionId: '7', name: '스위트 칠리', price: 0, isSelected: false },
        { id: '32', optionId: '7', name: '스모크 바비큐', price: 0, isSelected: false },
        { id: '33', optionId: '7', name: '핫 칠리', price: 0, isSelected: false },
        { id: '34', optionId: '7', name: '허니 머스타드', price: 0, isSelected: false },
        { id: '35', optionId: '7', name: '사우스웨스트 치폴레', price: 0, isSelected: false },
        { id: '36', optionId: '7', name: '홀스래디쉬', price: 0, isSelected: false },
        { id: '37', optionId: '7', name: '머스터드', price: 0, isSelected: false },
        { id: '38', optionId: '7', name: '엑스트라 버진 올리브 오일', price: 0, isSelected: false },
        { id: '39', optionId: '7', name: '레드 와인 식초', price: 0, isSelected: false },
        { id: '40', optionId: '7', name: '소금', price: 0, isSelected: false },
        { id: '41', optionId: '7', name: '후추', price: 0, isSelected: false },
      ],
    },
    {
      id: '8',
      menuId: '0',
      title: '쿠키 또는 칩',
      essential: true,
      only: true,
      optionLists: [
        { id: '42', optionId: '8', name: '더블 초코칩 쿠키', price: 0, isSelected: false },
        { id: '43', optionId: '8', name: '초코칩 쿠키', price: 0, isSelected: false },
        { id: '44', optionId: '8', name: '오토밀 레이즌', price: 0, isSelected: false },
        { id: '45', optionId: '8', name: '라즈베리 치즈케익', price: 0, isSelected: false },
        { id: '46', optionId: '8', name: '화이트 초코 마카다미아', price: 0, isSelected: false },
        { id: '47', optionId: '8', name: '칩 (랜덤발송)', price: 0, isSelected: false },
      ],
    },
    {
      id: '9',
      menuId: '0',
      title: '음료 선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '48', optionId: '9', name: '코카콜라 (355ml)', price: 0, isSelected: false },
        { id: '49', optionId: '9', name: '스프라이트 (355ml)', price: 0, isSelected: false },
        { id: '50', optionId: '9', name: '코카콜라 제로 (355ml)', price: 0, isSelected: false },
        { id: '51', optionId: '9', name: '닥터페퍼 (355ml)', price: 0, isSelected: false },
      ],
    },
  ],
  reducers: {
    optionSelectedHandler(state, action) {
      const targetState = state.find((option) => option.id === action.payload.optionId);
      if (targetState) {
        if (targetState.only) {
          targetState.optionLists.forEach((optionList, i) => {
            if (i === action.payload.index) {
              optionList.isSelected = true;
            } else {
              optionList.isSelected = false;
            }
          });
        } else {
          targetState.optionLists[action.payload.index].isSelected =
            !targetState?.optionLists[action.payload.index].isSelected;
        }
      }
    },
    addCategoryOfOptions(state, action) {
      const optionCategoryNames = action.payload.optionCategoryNames.split(',');
      for (let i = 0; i < optionCategoryNames.length; i++) {
        state.push({
          id: uuidv4(),
          menuId: action.payload.menuId,
          title: optionCategoryNames[i],
          essential: false,
          only: false,
          optionLists: [],
        });
      }
    },
    deleteCategoryOfOptions(state, action) {
      const targetOptionIndex = state.findIndex((option) => option.id === action.payload);
      state.splice(targetOptionIndex, 1);
    },
    addOptionLists(state, action) {
      const optionNames = action.payload.optionNames.split(',');
      const targetOption = state.find((option) => option.id === action.payload.optionId);
      if (targetOption) {
        for (let i = 0; i < optionNames.length; i++) {
          targetOption.optionLists.push({
            id: uuidv4(),
            optionId: action.payload.optionId,
            name: optionNames[i],
            price: 0,
            isSelected: false,
          });
        }
      }
    },
    deleteOptionList(state, action) {
      const targetOption = state.find((option) => option.id === action.payload.optionId);
      if (targetOption) {
        targetOption.optionLists.splice(action.payload.index, 1);
      }
    },
    checkHnadler(state, action) {
      const target = state.find((option) => option.id === action.payload.optionId);
      if (target) {
        if (action.payload.checked === 'only') {
          target.only = action.payload.value;
        } else if (action.payload.checked === 'essential') {
          target.essential = action.payload.value;
        }
      }
    },
    changePrice(state, action) {
      const targetOption = state.find((option) => option.id === action.payload.optionId);
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
} = optionsSlice.actions;

export default optionsSlice.reducer;
