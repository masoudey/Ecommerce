import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import reviewsReducer from './slices/reviewsSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    reviews: reviewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
