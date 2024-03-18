import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategories: (state, action) => {
      console.log(action.payload);
      state.total = action.payload.total;
      state.categories = action.payload.documents;
    },
  },
});

export const { addCategories } = categorySlice.actions;
export default categorySlice.reducer;
