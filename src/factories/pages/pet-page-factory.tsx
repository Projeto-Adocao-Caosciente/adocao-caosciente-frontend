import React from 'react'
import PetPage from '../../presentation/pages/PetPage'
import { makePetInteractor } from '../interactors/pet-interactor-factory'

export const makePetPage: React.FC = () => {
    return <PetPage interactor={makePetInteractor()} />
}
