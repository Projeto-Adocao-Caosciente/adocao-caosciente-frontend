import React from 'react'
import OngPage from '../../presentation/pages/OngPage'
import { makeOngValidation } from '../validations/ong-register-validations-factory'
import { makeOngInteractor } from '../interactors/ong-interactor-factory'

export const makeOngPage = (isEditing: boolean = false) => {
    return (
        <OngPage
            validationWrapper={makeOngValidation(isEditing)}
            interactor={makeOngInteractor()}
            isEditing={isEditing}
        />
    )
}
