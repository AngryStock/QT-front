import { createSlice } from '@reduxjs/toolkit';

export interface Options {
  id: string;
  title: string;
  essential: boolean;
  only: boolean;
  optionLists: OptionLists[];
}
interface OptionLists {
  id: string;
  name: string;
  price: number;
  isSelected: boolean;
}

export const optionsSlice = createSlice({
  name: 'options',
  initialState: [
    {
      id: '빵선택',
      title: '빵선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '화이트', name: '화이트', price: 0, isSelected: true },
        { id: '파마산오레가노', name: '파마산오레가노', price: 0, isSelected: false },
        { id: '위트', name: '위트', price: 0, isSelected: false },
        { id: '허니오트', name: '허니오트', price: 0, isSelected: false },
        { id: '플랫브레드', name: '플랫브레드', price: 0, isSelected: false },
      ],
    },
    {
      id: '치즈선택',
      title: '치즈선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '아메리칸치즈', name: '아메리칸치즈', price: 0, isSelected: true },
        { id: '슈레드치즈', name: '슈레드치즈', price: 0, isSelected: false },
        { id: '모차렐라치즈', name: '모차렐라치즈', price: 0, isSelected: false },
        { id: '치즈제외', name: '치즈제외', price: 0, isSelected: false },
      ],
    },
    {
      id: '미트추가',
      title: '미트추가',
      essential: false,
      only: false,
      optionLists: [{ id: '미트추가(동일메뉴)', name: '미트추가(동일메뉴)', price: 3000, isSelected: false }],
    },
    {
      id: '치즈추가',
      title: '치즈추가',
      essential: false,
      only: false,
      optionLists: [{ id: '치즈추가(동일치즈)', name: '치즈추가(동일치즈)', price: 1400, isSelected: false }],
    },
    {
      id: '재료추가',
      title: '재료추가',
      essential: false,
      only: false,
      optionLists: [
        { id: '에그마요', name: '에그마요', price: 2000, isSelected: false },
        { id: '페페로니', name: '페페로니', price: 1400, isSelected: false },
        { id: '베이컨', name: '베이컨', price: 1500, isSelected: false },
        { id: '아보카도', name: '아보카도', price: 1500, isSelected: false },
        { id: '오믈렛', name: '오믈렛', price: 1800, isSelected: false },
      ],
    },
    {
      id: '빵/미트 토스팅 선택',
      title: '빵/미트 토스팅 선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '토스팅', name: '토스팅', price: 0, isSelected: true },
        { id: '토스팅 안함', name: '토스팅 안함', price: 0, isSelected: false },
      ],
    },
    {
      id: '야외 제외',
      title: '야외 제외',
      essential: false,
      only: false,
      optionLists: [
        { id: '양상추 제외', name: '양상추 제외', price: 0, isSelected: false },
        { id: '토마토 제외', name: '토마토 제외', price: 0, isSelected: false },
        { id: '오이 제외', name: '오이 제외', price: 0, isSelected: false },
        { id: '피망 제외', name: '피망 제외', price: 0, isSelected: false },
        { id: '양파 제외', name: '양파 제외', price: 0, isSelected: false },
        { id: '피클 제외', name: '피클 제외', price: 0, isSelected: false },
        { id: '올리브 제외', name: '올리브 제외', price: 0, isSelected: false },
        { id: '할라피뇨 제외', name: '할라피뇨 제외', price: 0, isSelected: false },
      ],
    },
    {
      id: '소스선택 *미선택시 추천소스 제공',
      title: '소스선택 *미선택시 추천소스 제공',
      essential: false,
      only: false,
      optionLists: [
        { id: '추천소스', name: '추천소스', price: 0, isSelected: false },
        { id: '소스 넣지않음', name: '소스 넣지않음', price: 0, isSelected: false },
        { id: '랜치', name: '랜치', price: 0, isSelected: false },
        { id: '스위트 어니언', name: '스위트 어니언', price: 0, isSelected: false },
        { id: '마요네즈', name: '마요네즈', price: 0, isSelected: false },
        { id: '스위트 칠리', name: '스위트 칠리', price: 0, isSelected: false },
        { id: '스모크 바비큐', name: '스모크 바비큐', price: 0, isSelected: false },
        { id: '핫 칠리', name: '핫 칠리', price: 0, isSelected: false },
        { id: '허니 머스타드', name: '허니 머스타드', price: 0, isSelected: false },
        { id: '사우스웨스트 치폴레', name: '사우스웨스트 치폴레', price: 0, isSelected: false },
        { id: '홀스래디쉬', name: '홀스래디쉬', price: 0, isSelected: false },
        { id: '머스터드', name: '머스터드', price: 0, isSelected: false },
        { id: '엑스트라 버진 올리브 오일', name: '엑스트라 버진 올리브 오일', price: 0, isSelected: false },
        { id: '레드 와인 식초', name: '레드 와인 식초', price: 0, isSelected: false },
        { id: '소금', name: '소금', price: 0, isSelected: false },
        { id: '후추', name: '후추', price: 0, isSelected: false },
      ],
    },
    {
      id: '쿠키 또는 칩',
      title: '쿠키 또는 칩',
      essential: true,
      only: true,
      optionLists: [
        { id: '더블 초코칩 쿠키', name: '더블 초코칩 쿠키', price: 0, isSelected: true },
        { id: '초코칩 쿠키', name: '초코칩 쿠키', price: 0, isSelected: false },
        { id: '오토밀 레이즌', name: '오토밀 레이즌', price: 0, isSelected: false },
        { id: '라즈베리 치즈케익', name: '라즈베리 치즈케익', price: 0, isSelected: false },
        { id: '화이트 초코 마카다미아', name: '화이트 초코 마카다미아', price: 0, isSelected: false },
        { id: '칩 (랜덤발송)', name: '칩 (랜덤발송)', price: 0, isSelected: false },
      ],
    },
    {
      id: '음료 선택',
      title: '음료 선택',
      essential: true,
      only: true,
      optionLists: [
        { id: '코카콜라 (355ml)', name: '코카콜라 (355ml)', price: 0, isSelected: true },
        { id: '스프라이트 (355ml)', name: '스프라이트 (355ml)', price: 0, isSelected: false },
        { id: '코카콜라 제로 (355ml)', name: '코카콜라 제로 (355ml)', price: 0, isSelected: false },
        { id: '닥터페퍼 (355ml)', name: '닥터페퍼 (355ml)', price: 0, isSelected: false },
      ],
    },
  ],
  reducers: {
    optionSelectedHandler(state: Options[], action) {
      const targetState = state.find((option) => option.id === action.payload.optionId);
      if (targetState?.only) {
        targetState.optionLists.forEach((optionList) => {
          if (optionList.id === action.payload.optionListId) {
            optionList.isSelected = true;
          } else {
            optionList.isSelected = false;
          }
        });
      } else {
        targetState?.optionLists.forEach((optionList) => {
          if (optionList.id === action.payload.optionListId) optionList.isSelected = !optionList.isSelected;
        });
      }
    },
  },
});

export const { optionSelectedHandler } = optionsSlice.actions;

export default optionsSlice.reducer;
