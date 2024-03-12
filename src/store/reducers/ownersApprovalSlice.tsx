import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface OwnersApproval {
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
  businessReportCertificateFileUrl: string;
  businessRegistrationFileUrl: string;
  copyOfBankbookFileUrl: string;
  date: string;
}

export const ownersApprovalSlice = createSlice({
  name: 'ownersApproval',
  initialState: [],
  reducers: {
    signup(state: OwnersApproval[], action) {
      const onwnerInform = action.payload;
      onwnerInform['id'] = uuidv4();
      state.push(onwnerInform);
    },
    refuseSignup(state: OwnersApproval[], action) {
      const targetIndex = state.findIndex((owner) => owner.id === action.payload);
      state.splice(targetIndex, 1);
    },
  },
});

export const { signup, refuseSignup } = ownersApprovalSlice.actions;

export default ownersApprovalSlice.reducer;
