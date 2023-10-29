import { createSlice } from '@reduxjs/toolkit'
import { OngModel } from '../models/ongModel'
import { AnimalModel } from '../models/AnimalModel'

interface stateType {
    data: AnimalModel[]
}

const initialState: stateType = {
    data: [],
}

const animalsSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
        setAnimals: (state: any, action: { payload: AnimalModel }) => {
            state.data = action.payload
        }
    },
})

export const {setAnimals} = animalsSlice.actions
export default animalsSlice.reducer
