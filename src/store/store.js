import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import categorySlice from './categorySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice
    //TODO: add more slices here for posts
  },
});

export default store;
