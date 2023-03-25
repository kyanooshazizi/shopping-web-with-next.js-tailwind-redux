import { configureStore } from '@reduxjs/toolkit';
import box_shopping from './shopping';

export default configureStore({
  reducer: {
    shopping: box_shopping
  }
})