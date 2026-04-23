import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  language: 'en' | 'es' | 'pt';
  isLoading: boolean;
  loadedComponents: Set<string>;
  performanceMetrics: {
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    tbt?: number;
  };
}

const initialState: AppState = {
  language: 'en',
  isLoading: false,
  loadedComponents: new Set(),
  performanceMetrics: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'es' | 'pt'>) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    markComponentLoaded: (state, action: PayloadAction<string>) => {
      state.loadedComponents.add(action.payload);
    },
    setPerformanceMetrics: (state, action: PayloadAction<AppState['performanceMetrics']>) => {
      state.performanceMetrics = { ...state.performanceMetrics, ...action.payload };
    },
  },
});

export const {
  setLanguage,
  setLoading,
  markComponentLoaded,
  setPerformanceMetrics,
} = appSlice.actions;

export default appSlice.reducer;

