import React, { useContext, useEffect } from 'react'
import PetCard, { PetCardVariant } from '../components/PetCard'
import { AnimalModel } from '../../domain/models/animal-model'
import { useFetch } from '../hooks/use-fetch'
import HomeTemplate from '../templating/HomeTemplate'
import { PetInteractor } from '../../domain/interactors/pet-interactor'
import { AuthContext } from '../contexts/AuthContext'

type AdopterHomePageProps = {
    interactor: PetInteractor
}

export default function AdopterHome({ interactor }: AdopterHomePageProps) {
    const { user } = useContext(AuthContext)

    const animalsRequest = useFetch<AnimalModel[]>({
        fn: (_) => interactor.getAllInAdoption(),
    })

    useEffect(() => {
        animalsRequest.fetch().then()
    }, [])

    function buildAnimalsList(
        animals: AnimalModel[] | undefined
    ): React.JSX.Element {
        if (animals && animals.length > 0) {
            return (
                <>
                    {animals.map((animal: AnimalModel, index: number) => {
                        return (
                            <PetCard
                                id={animal.id}
                                imageSrc={animal.photo}
                                imageAlt="Imagem de um pet"
                                title={animal.name}
                                key={index + Math.random()}
                                variant={PetCardVariant.adoption}
                            />
                        )
                    })}
                </>
            )
        }

        return <p>Nenhum pet cadastrado</p>
    }

    function buildPetsList(): React.JSX.Element {
        if (animalsRequest.hasSucceeded()) {
            return buildAnimalsList(animalsRequest.state.data)
        }

        if (animalsRequest.isLoading()) {
            return <p>Carregando...</p>
        }

        return <p>Ocorreu um erro carregando os pets</p>
    }

    return (
        <HomeTemplate
            name={user?.name ?? 'Adotante'}
            filter={{ label: 'Filtro por nome', onChange: (_) => {} }}
            heading={{
                title: 'Seus Processos de Adoção',
            }}
            content={buildPetsList()}
        />
    )
}
