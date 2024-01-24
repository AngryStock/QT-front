import { createSlice } from '@reduxjs/toolkit';

export const topExposureMenusSlice = createSlice({
  name: 'topExposureMenus',
  initialState: [
    {
      id: '0',
      category: '샌드위치15cm 세트',
      name: '스파이시 이탈리안 (15cm세트)',
      description: '페퍼로니 & 살라미가 입안 가득, 페퍼로니의 부드러운 매콤함을 만나보세요.',
      price: 9500,
      img: '/images/spicy_italian_15cm_set.png',
    },
    {
      id: '1',
      category: '샌드위치15cm 세트',
      name: '치킨 베이컨 아보카도 (15cm세트)',
      description: '담백한 닭가슴살로 만든 치킨 슬라이스와 베이컨, 부드러운 아보카도의 만남',
      price: 10500,
      img: '/images/chicken_bacon_avocado_15cm_set.png',
    },
    {
      id: '2',
      category: '샌드위치15cm 단품',
      name: '이탈리안 비엠티 (15cm단품)',
      description: '',
      price: 6700,
      img: '/images/italian_bmt_15cm.png',
    },
  ],
  reducers: {},
});

export default topExposureMenusSlice.reducer;
