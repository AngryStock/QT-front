import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: [
    {
      title: '빵선택',
      essential: true,
      optionLists: [
        { name: '화이트', price: 0, isSelected: false },
        { name: '파마산오레가노', price: 0, isSelected: false },
        { name: '위트', price: 0, isSelected: false },
        { name: '허니오트', price: 0, isSelected: false },
        { name: '플랫브레드', price: 0, isSelected: false },
      ],
    },
    {
      title: '치즈선택',
      essential: true,
      optionLists: [
        { name: '아메리칸치즈', price: 0, isSelected: false },
        { name: '슈레드치즈', price: 0, isSelected: false },
        { name: '모차렐라치즈', price: 0, isSelected: false },
        { name: '치즈제외', price: 0, isSelected: false },
      ],
    },
    {
      title: '미트추가',
      essential: false,
      optionLists: [{ name: '미트추가(동일메뉴)', price: 3000, isSelected: false }],
    },
    {
      title: '치즈추가',
      essential: false,
      optionLists: [{ option: '치즈추가(동일치즈)', price: 1400, isSelected: false }],
    },
    {
      title: '재료추가',
      essential: false,
      optionLists: [
        { name: '에그마요', price: 2000, isSelected: false },
        { name: '페페로니', price: 1400, isSelected: false },
        { name: '베이컨', price: 1500, isSelected: false },
        { name: '아보카도', price: 1500, isSelected: false },
        { name: '오믈렛', price: 1800, isSelected: false },
      ],
    },
    {
      title: '빵/미트 토스팅 선택',
      essential: true,
      optionLists: [
        { name: '토스팅', price: 0, isSelected: false },
        { name: '토스팅 안함', price: 0, isSelected: false },
      ],
    },
    {
      title: '야외 제외',
      essential: false,
      optionLists: [
        { name: '양상추 제외', price: 0, isSelected: false },
        { name: '토마토 제외', price: 0, isSelected: false },
        { name: '오이 제외', price: 0, isSelected: false },
        { name: '피망 제외', price: 0, isSelected: false },
        { name: '피망 제외', price: 0, isSelected: false },
        { name: '양파 제외', price: 0, isSelected: false },
        { name: '피클 제외', price: 0, isSelected: false },
        { name: '올리브 제외', price: 0, isSelected: false },
        { name: '할라피뇨 제외', price: 0, isSelected: false },
      ],
    },
    {
      title: '소스선택 *미선택시 추천소스 제공',
      essential: false,
      optionLists: [
        { name: '추천소스', price: 0, isSelected: false },
        { name: '소스 넣지않음', price: 0, isSelected: false },
        { name: '랜치', price: 0, isSelected: false },
        { name: '스위트 어니언', price: 0, isSelected: false },
        { name: '마요네즈', price: 0, isSelected: false },
        { name: '스위트 칠리', price: 0, isSelected: false },
        { name: '스모크 바비큐', price: 0, isSelected: false },
        { name: '핫 칠리', price: 0, isSelected: false },
        { name: '허니 머스타드', price: 0, isSelected: false },
        { name: '사우스웨스트 치폴레', price: 0, isSelected: false },
        { name: '홀스래디쉬', price: 0, isSelected: false },
        { name: '머스터드', price: 0, isSelected: false },
        { name: '엑스트라 버진 올리브 오일', price: 0, isSelected: false },
        { name: '레드 와인 식초', price: 0, isSelected: false },
        { name: '소금', price: 0, isSelected: false },
        { name: '후추', price: 0, isSelected: false },
      ],
    },
    {
      title: '쿠키 또는 칩',
      essential: true,
      optionLists: [
        { name: '더블 초코칩 쿠키', price: 0, isSelected: false },
        { name: '초코칩 쿠키', price: 0, isSelected: false },
        { name: '오토밀 레이즌', price: 0, isSelected: false },
        { name: '라즈베리 치즈케익', price: 0, isSelected: false },
        { name: '화이트 초코 마카다미아', price: 0, isSelected: false },
        { name: '칩 (랜덤발송)', price: 0, isSelected: false },
      ],
    },
    {
      title: '음료 선택',
      essential: true,
      optionLists: [
        { name: '코카콜라 (355ml)', price: 0, isSelected: false },
        { name: '스프라이트 (355ml)', price: 0, isSelected: false },
        { name: '코카콜라 제로 (355ml)', price: 0, isSelected: false },
        { name: '닥터페퍼 (355ml)', price: 0, isSelected: false },
      ],
    },
  ],
  reducers: {},
});

export default optionsSlice.reducer;
