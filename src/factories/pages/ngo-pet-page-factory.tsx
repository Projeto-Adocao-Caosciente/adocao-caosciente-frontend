import React from 'react'
import NGOPetPage from '../../presentation/pages/NGOPetPage'
import { makePetInteractor } from '../interactors/pet-interactor-factory'
import { makePetValidation } from '../validations/pet-validations-factory'
import { makeFormInteractor } from '../interactors/form-interactor.factory'

export const makeNGOPetPage = () => {
    return (
        <NGOPetPage
            petInteractor={makePetInteractor()}
            validationWrapper={makePetValidation()}
            formInteractor={makeFormInteractor()}
        />
    )
}
