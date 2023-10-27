import { createSlice } from '@reduxjs/toolkit';
import { OngModel } from '../models/ongModel';

interface stateType {
  isAuthenticated: boolean,
  ong: Partial<OngModel>
}

const initialState: stateType = {
  isAuthenticated: false,
  ong: {}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.ong = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.ong = {}
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer