import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    updateSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    searchLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { updateSearchQuery, searchLoading } = searchSlice.actions;
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;