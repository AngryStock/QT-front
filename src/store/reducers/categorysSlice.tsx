import { createSlice } from '@reduxjs/toolkit';

export const categorysSlice = createSlice({
  name: 'categorys',
  initialState: ['샌드위치15cm 세트', '샌드위치15cm 단품', '샌드위치30cm 세트', '샌드위치30cm 단품'],
  reducers: {},
});

export default categorysSlice.reducer;
