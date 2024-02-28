import { createSlice } from '@reduxjs/toolkit';

export const menusSlice = createSlice({
  name: 'menus',
  initialState: [
    {
      id: '10',
      category: '샌드위치15cm 세트',
      name: '스파이시 쉬림프 (15cm세트)',
      description: '탱글한 쉬림프에 이국적인 시즈닝을 더해 색다른 매콤함을 만나보세요.',
      price: 10500,
      img: '/images/spicy_shrimp_15cm_set.png',
    },
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
    {
      id: '3',
      category: '샌드위치15cm 단품',
      name: '스테이크 & 치즈 (15cm단품)',
      description: '',
      price: 7900,
      img: '/images/steak_&_cheese_15cm.png',
    },
    {
      id: '4',
      category: '샌드위치15cm 단품',
      name: 'K-바비큐 (15cm단품)',
      description: '한국적인 바비큐의 맛으로 마늘, 간장 그리고 은은한 불맛까지 즐겨보세요',
      price: 7300,
      img: '/images/k-barbecue_15cm.png',
    },
    {
      id: '5',
      category: '샌드위치30cm 세트',
      name: '쉬림프 (30cm세트)',
      description: '탱글한 쉬림프 5마리가 그대로, 신선하고 담백한 쉬림프의 맛 그대로 즐겨보세요!',
      price: 16700,
      img: '/images/shrimp_30cm_set.png',
    },
    {
      id: '6',
      category: '샌드위치30cm 세트',
      name: '햄 (30cm세트)',
      description: '풍부한 햄이 만들어내는 담백함을 입 안 가득 즐겨보세요!',
      price: 13500,
      img: '/images/ham_30cm_set.png',
    },
    {
      id: '7',

      category: '샌드위치30cm 세트',
      name: '로스트 치킨 (30cm세트)',
      description: '오븐에 구워 담백한 닭 가슴살 치킨 패티로 맛과 영양 모두를 만족시키는 메뉴!',
      price: 16100,
      img: '/images/roasted_chiken_30cm_set.png',
    },
    {
      id: '8',
      category: '샌드위치30cm 단품',
      name: '치킨 데리야끼 (30cm단품)',
      description: '',
      price: 12900,
      img: '/images/chicken_teriyaki_30cm.png',
    },
    {
      id: '9',
      category: '샌드위치30cm 단품',
      name: '참치 (30cm단품)',
      description: '',
      price: 10900,
      img: '/images/tuna_30cm.png',
    },
  ],
  reducers: {},
});

export default menusSlice.reducer;
