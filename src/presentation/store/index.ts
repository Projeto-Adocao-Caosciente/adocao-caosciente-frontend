import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/userReducer';
import animalsReducer from '../reducer/animalsReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        animals: animalsReducer,
    }
})
    