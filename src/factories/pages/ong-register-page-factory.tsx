import React from 'react'
import OngRegister from '../../presentation/pages/OngRegister'
import { makeOngRegisterValidation } from '../validations/ong-register-validations-factory'
import { makeOngRegisterInteractor } from '../interactors/ong-interactor-factory'

export const makeOngRegisterPage = () => {
    return (
        <OngRegister
            validationWrapper={makeOngRegisterValidation()}
            interactor={makeOngRegisterInteractor()}
        />
    )
}
