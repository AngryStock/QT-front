import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSliceReducer from './reducers/cartSlice';
import categorysSliceReducer from './reducers/categorysSlice';
import loginStateSliceReducer from './reducers/loginStateSlice';
import menusSliceReducer from './reducers/menusSlice';
import optionsSliceReducer from './reducers/optionsSlice';
import orderSliceReducer from './reducers/orderSlice';
import ownersApprovalSliceReducer from './reducers/ownersApprovalSlice';
import ownersSliceReducer from './reducers/ownersSlice';

const reducer = combineReducers({
  menus: menusSliceReducer,
  categorys: categorysSliceReducer,
  options: optionsSliceReducer,
  owners: ownersSliceReducer,
  ownersApproval: ownersApprovalSliceReducer,
  loginState: loginStateSliceReducer,
  cart: cartSliceReducer,
  order: orderSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginState'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
