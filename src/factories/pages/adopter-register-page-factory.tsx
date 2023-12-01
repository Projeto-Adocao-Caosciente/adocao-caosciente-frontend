import React from 'react'
import AdopterRegisterPage from '../../presentation/pages/AdopterRegisterPage'
import { makeAdopterRegisterValidation } from '../validations/adopter-register-validations-factory'
import { makeAdopterInteractor } from '../interactors/adopter-interactor-factory'

export const makeAdopterRegisterPage = () => {
    return (
        <AdopterRegisterPage
            validationWrapper={makeAdopterRegisterValidation()}
            interactor={makeAdopterInteractor()}
        />
    )
}
