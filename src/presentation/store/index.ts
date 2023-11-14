import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducer/user-reducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})
