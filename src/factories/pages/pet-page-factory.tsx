import React from 'react'
import PetPage from '../../presentation/pages/PetPage'
import { makePetInteractor } from '../interactors/pet-interactor-factory'
import { makePetValidation } from '../validations/pet-validations-factory'
import { makeFormInteractor } from '../interactors/form-interactor.factory'

export const makePetPage = () => {
    return (
        <PetPage
            petInteractor={makePetInteractor()}
            validationWrapper={makePetValidation()}
            formInteractor={makeFormInteractor()}
        />
    )
}
