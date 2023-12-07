import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useFetch } from '../hooks/use-fetch'
import { AnimalModel } from '../../domain/models/animal-model'
import PetCard from '../components/PetCard'
import HomeTemplate from '../templating/HomeTemplate'
import { Button } from '@nextui-org/react'
import { AppRoutes } from '../../routes/app-routes'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import { PetInteractor } from '../../domain/interactors/pet-interactor'
import debounce from 'lodash.debounce'

type NGOHomePageProps = {
    interactor: PetInteractor
}

export default function NGOHome({ interactor }: NGOHomePageProps) {
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const animalsRequest = useFetch<AnimalModel[]>({
        fn: (query?: string) => interactor.getAll(query),
    })

    const debouncedFetch = debounce((query) => {
        animalsRequest.fetch(query).then()
    }, 500)

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
                            <div data-selector="pet-card-container">
                                <PetCard
                                    data-selector="pet-card"
                                    id={animal.id}
                                    imageSrc={animal.photo}
                                    imageAlt="Imagem de um pet"
                                    title={animal.name}
                                    key={index + Math.random()}
                                />
                            </div>
                        )
                    })}
                </>
            )
        }

        return (
            <p data-selector="pet-empty-list">
                Parece que você ainda não cadastrou nenhum pet.
            </p>
        )
    }

    function buildNGOPetsList(): React.JSX.Element {
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
            name={user?.name ?? ''}
            filter={{ label: 'Pesquisar por nome', onChange: debouncedFetch }}
            heading={{
                title: 'Pets cadastrados',
                rightContent: (
                    <Button
                        color="primary"
                        variant="solid"
                        size="lg"
                        className="xs:hidden md:block"
                        onClick={() => navigate(AppRoutes.petRegister)}
                    >
                        Cadastrar um novo Pet
                    </Button>
                ),
                mobileRightContent: (
                    <Button
                        isIconOnly
                        color="primary"
                        variant="solid"
                        size="lg"
                        className="md:hidden"
                        onClick={() => navigate(AppRoutes.petRegister)}
                        startContent={<AddCircleSolidIcon />}
                    />
                ),
            }}
            content={buildNGOPetsList()}
        />
    )
}
