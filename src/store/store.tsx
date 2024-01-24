import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import menusSliceReducer from './reducers/menusSlice';
import categorysSliceReducer from './reducers/categorysSlice';
import topExposureSliceReducer from './reducers/topExposureSlice';
import topExposureMenusSliceReducer from './reducers/topExposureMenusSlice';
import optionsSliceReducer from './reducers/optionsSlice';

const reducer = combineReducers({
  menus: menusSliceReducer,
  categorys: categorysSliceReducer,
  topExposure: topExposureSliceReducer,
  topExposureMenus: topExposureMenusSliceReducer,
  options: optionsSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
