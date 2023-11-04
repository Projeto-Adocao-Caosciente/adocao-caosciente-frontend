import { createSlice } from '@reduxjs/toolkit'
import { OngModel } from '../models/ong-model'

const storedUser = localStorage.getItem('user')
const initialState = {
    ong: storedUser ? JSON.parse(storedUser) : ({} as OngModel),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: any, action: { payload: OngModel }) => {
            // TODO: Decidir se os dados do usuario serao salvos no localStorage, cookie ou session
            state.ong = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state: any) => {
            state.ong = {}
            localStorage.removeItem('user')
        },
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
