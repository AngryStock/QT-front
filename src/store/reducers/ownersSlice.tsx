import { createSlice } from '@reduxjs/toolkit';

export interface Owner {
  id?: string;
  businessNumber: string;
  ownerId: string;
  password: string;
  passwordCheck: string;
  businessName: string;
  representativeName: string;
  representativeCellPhoneNumber: string;
  storePhoneNumber: string;
  email: string;
  address: string;
  detailedAddress: string;
  bank: string;
  accountNumber: string;
  businessReportCertificateFileUrl?: string;
  businessRegistrationFileUrl?: string;
  copyOfBankbookFileUrl?: string;
  date?: string;
}

export const ownersSlice = createSlice({
  name: 'owners',
  initialState: [],
  reducers: {
    approvalSignup(state: Owner[], action) {
      state.push(action.payload);
    },
  },
});

export const { approvalSignup } = ownersSlice.actions;

export default ownersSlice.reducer;
