import React from 'react'
import { makePetInteractor } from '../interactors/pet-interactor-factory'
import Home from '../../presentation/pages/Home'

export const makeHomePage = () => {
    return <Home interactor={makePetInteractor()} />
}
