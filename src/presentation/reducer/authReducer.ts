import { createSlice } from '@reduxjs/toolkit';
import { OngModel } from '../models/ongModel';

interface stateType {
  isAuthenticated: boolean,
  user: Partial<OngModel>
}

const initialState: stateType = {
  isAuthenticated: false,
  user: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = {}
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer