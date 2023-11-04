import { createSlice } from '@reduxjs/toolkit'
import { AnimalModel } from '../models/animal-model'

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
        },
    },
})

export const { setAnimals } = animalsSlice.actions
export default animalsSlice.reducer
