import { PetInteractor } from '../../domain/interactors/pet-interactor'
import { renderByUserType } from '../../utils/render-by-user-type'
import AdopterHome from './AdopterHome'
import React from 'react'
import NGOHome from './NGOHome'

type HomePageProps = {
    interactor: PetInteractor
}

export default function Home({ interactor }: HomePageProps) {
    return renderByUserType({
        adopterRender: <AdopterHome interactor={interactor} />,
        ngoRender: <NGOHome interactor={interactor} />,
    })
}
