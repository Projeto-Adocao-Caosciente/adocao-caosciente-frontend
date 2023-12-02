import React from "react"
import FormPage from "../../presentation/pages/Form"
import { makeFormInteractor } from "../interactors/form-interactor.factory"

export const makeFormPage = () => {
    return (
        <FormPage
            interactor={makeFormInteractor()}
        />
    )
}