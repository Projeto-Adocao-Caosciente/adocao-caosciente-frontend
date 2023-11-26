import React from 'react'
import AdopterHome from "../../presentation/pages/AdopterHome";
import {makePetInteractor} from "../interactors/pet-interactor-factory";

export const makeAdopterHomePage = () => {
    return <AdopterHome interactor={makePetInteractor()} />
}
