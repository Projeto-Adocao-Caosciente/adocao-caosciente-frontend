import React from 'react'
import LoginPage from '../../presentation/pages/Login'
import { makeLoginValidation } from '../validations/login-validations-factory'

export const makeLoginPage = () => {
    return <LoginPage validationWrapper={makeLoginValidation()} />
}
