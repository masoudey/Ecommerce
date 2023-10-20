import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer, // Use the combined rootReducer
    devTools: true,
});

export default store;
