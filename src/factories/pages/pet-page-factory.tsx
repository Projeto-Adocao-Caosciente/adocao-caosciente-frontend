import React from 'react'
import PetPage from '../../presentation/pages/PetPage'
import { makePetInteractor } from '../interactors/pet-interactor-factory'
import { makePetValidation } from '../validations/pet-validations-factory'

export const makePetPage = () => {
    return (
        <PetPage
            interactor={makePetInteractor()}
            validationWrapper={makePetValidation()}
        />
    )
}
