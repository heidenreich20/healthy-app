import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        filters: [],
        loading: false,
        vegan: false
    },
    reducers: {
        addCategory: (state, action) => {
            state.filters = action.payload;
        },
        removeCategory: (state, action) => {
            const index = state.filters.indexOf(action.payload);
            if (index !== -1) {
                state.filters.splice(index, 1);
            }
        },
        toggleVegan: (state) => {
            state.vegan = !state.vegan
        },
        categoriesLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { addCategory, removeCategory, updateCategory, categoriesLoading, toggleVegan } = categoriesSlice.actions;

export default categoriesSlice.reducer;