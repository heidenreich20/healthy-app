import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export const selectLoadingState = (state) => state.loading;

export default loadingSlice.reducer;
