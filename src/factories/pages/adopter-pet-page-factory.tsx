import React from 'react'
import { makePetInteractor } from '../interactors/pet-interactor-factory'
import AdopterPetPage from '../../presentation/pages/AdopterPetPage'

export const makeAdopterPetPage = () => {
    return <AdopterPetPage petInteractor={makePetInteractor()} />
}
