import React from 'react'
import OngRegister from '../../presentation/pages/OngRegister'
import { makeOngRegisterValidation } from '../validations/ong-register-validations-factory'

export const makeOngRegisterPage = () => {
    return <OngRegister validationWrapper={makeOngRegisterValidation()} />
}
