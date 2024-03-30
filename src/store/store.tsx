import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categorysSliceReducer from './reducers/categorysSlice';
import loginStateSliceReducer from './reducers/loginStateSlice';
import menusSliceReducer from './reducers/menusSlice';
import optionsSliceReducer from './reducers/optionsSlice';
import ownersApprovalSliceReducer from './reducers/ownersApprovalSlice';
import ownersSliceReducer from './reducers/ownersSlice';
import topExposureMenusSliceReducer from './reducers/topExposureMenusSlice';
import topExposureSliceReducer from './reducers/topExposureSlice';

const reducer = combineReducers({
  menus: menusSliceReducer,
  categorys: categorysSliceReducer,
  topExposure: topExposureSliceReducer,
  topExposureMenus: topExposureMenusSliceReducer,
  options: optionsSliceReducer,
  owners: ownersSliceReducer,
  ownersApproval: ownersApprovalSliceReducer,
  loginState: loginStateSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['owners', 'ownersApproval', 'loginState', 'categorys', 'menus'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
