import React from 'react'
import OngPage from '../../presentation/pages/OngPage'
import { makeOngValidation } from '../validations/ong-register-validations-factory'
import { makeOngInteractor } from '../interactors/ong-interactor-factory'
import { renderByUserType } from '../../utils/render-by-user-type'
import AdopterProfilePage from '../../presentation/pages/AdopterProfilePage'
import { makeAdopterInteractor } from '../interactors/adopter-interactor-factory'
import { makeAdopterProfileValidation } from '../validations/adopter-profile-validations-factory'

export const makeProfilePage = () => {
    return <ProfilePage />
}

const ProfilePage = () => {
    return renderByUserType({
        adopterRender: (
            <AdopterProfilePage
                interactor={makeAdopterInteractor()}
                validationWrapper={makeAdopterProfileValidation()}
            />
        ),
        ngoRender: (
            <OngPage
                validationWrapper={makeOngValidation(true)}
                interactor={makeOngInteractor()}
                isEditing
            />
        ),
    })
}
