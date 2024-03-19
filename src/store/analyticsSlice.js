import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalExpense: 0,
  todaysExpense: 0,
  expensiveCategory: '',
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    updateTotalExpense: (state, action) => {
      state.totalExpense = action.payload.totalExpense;
    },

    updateTodaysExpense: (state, action) => {
      state.todaysExpense = action.payload.todaysExpense;
    },

    updateExpensiveCategory: (state, action) => {
      state.expensiveCategory = action.payload.expensiveCategory;
    },
  },
});

export const {
  updateTotalExpense,
  updateTodaysExpense,
  updateExpensiveCategory,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
