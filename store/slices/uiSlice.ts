import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isMobileMenuOpen: boolean;
  isPreloaderVisible: boolean;
  scrollPosition: number;
  mousePosition: { x: number; y: number };
  isScrolled: boolean;
  viewportWidth: number;
  viewportHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isPreloaderVisible: true,
  scrollPosition: 0,
  mousePosition: { x: 0, y: 0 },
  isScrolled: false,
  viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
  viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
  isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setPreloaderVisible: (state, action: PayloadAction<boolean>) => {
      state.isPreloaderVisible = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
      state.isScrolled = action.payload > 50;
    },
    setMousePosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.mousePosition = action.payload;
    },
    setViewportSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
      state.viewportWidth = action.payload.width;
      state.viewportHeight = action.payload.height;
      state.isMobile = action.payload.width < 768;
      state.isTablet = action.payload.width >= 768 && action.payload.width < 1024;
      state.isDesktop = action.payload.width >= 1024;
    },
  },
});

export const {
  setMobileMenuOpen,
  setPreloaderVisible,
  setScrollPosition,
  setMousePosition,
  setViewportSize,
} = uiSlice.actions;

export default uiSlice.reducer;

