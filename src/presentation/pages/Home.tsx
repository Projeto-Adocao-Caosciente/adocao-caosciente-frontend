import { Button } from '@nextui-org/react'
import React, { useContext, useEffect } from 'react'
import PetCard from '../components/PetCard'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import { AppRoutes } from '../../routes/app-routes'
import { AnimalModel } from '../../domain/models/animal-model'
import { useFetch } from '../hooks/use-fetch'
import { useNavigate } from 'react-router-dom'
import { PetInteractor } from '../../domain/interactors/pet-interactor'
import HomeTemplate from '../templating/HomeTemplate'
import { AuthContext } from '../contexts/AuthContext'

type HomePageProps = {
    interactor: PetInteractor
}

export default function Home({ interactor }: HomePageProps) {
    const navigate = useNavigate()

    const { getUsername } = useContext(AuthContext)

    const animalsRequest = useFetch<AnimalModel[]>({
        fn: (_) => interactor.getAll(),
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
                            />
                        )
                    })}
                </>
            )
        }

        return <p>Nenhum pet cadastrado</p>
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
            name={getUsername()}
            filter={{ label: 'Pesquisar por nome', onChange: (value) => {} }}
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
