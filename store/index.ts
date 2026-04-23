import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import appReducer from './slices/appSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for performance
          ignoredActions: ['ui/setScrollPosition', 'ui/setMousePosition'],
        },
      }),
    // Enable Redux DevTools in development
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

