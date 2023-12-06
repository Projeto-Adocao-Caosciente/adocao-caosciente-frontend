import React from 'react'
import FormViewPage from '../../presentation/pages/FormViewPage'
import { makeFormInteractor } from '../interactors/form-interactor.factory'

export const makeFormViewPage = () => {
    return <FormViewPage interactor={makeFormInteractor()} />
}
