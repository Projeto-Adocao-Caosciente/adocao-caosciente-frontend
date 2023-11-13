import { Button, Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import PetCard from '../components/PetCard'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import { AppRoutes } from '../../routes/app-routes'
import { AnimalModel } from '../models/animal-model'
import { useFetch } from '../hooks/use-fetch'
import { useSelector } from 'react-redux'
import { OngModel } from '../models/ong-model'
import { useNavigate } from 'react-router-dom'
import { PetInteractor } from '../../domain/interactors/pet-interactor'

type HomePageProps = {
    interactor: PetInteractor
}

export default function Home({ interactor }: HomePageProps) {
    const navigate = useNavigate()

    const animalsRequest = useFetch<AnimalModel[]>({
        fn: (args) => interactor.getAll(),
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

    function handleListState(): React.JSX.Element {
        if (animalsRequest.hasSucceeded()) {
            return buildAnimalsList(animalsRequest.state.data)
        }

        if (animalsRequest.isLoading()) {
            return <p>Carregando...</p>
        }

        return <p>Ocorreu um erro carregando os pets</p>
    }

    const ongData: OngModel = useSelector((state: any) => state.user.ong)
    return (
        <main className="container mb-10">
            <h1 className="text-center xs:text-2xl md:text-3xl font-bold my-16">
                Bem-vindo de volta
                <br />
                {ongData.name}
            </h1>
            <section className="flex mb-4 md:justify-between">
                <h2 className="text-3xl">Pets cadastrados</h2>
                <Button
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="xs:hidden md:block"
                    onClick={() => navigate(AppRoutes.petRegister)}
                >
                    Cadastrar um novo Pet
                </Button>
            </section>
            <section className="flex gap-4 mb-8">
                <Input
                    variant="bordered"
                    placeholder="Pesquisar por nome"
                    size="lg"
                />
                <Button
                    isIconOnly
                    color="primary"
                    variant="solid"
                    size="lg"
                    className="md:hidden"
                    startContent={<AddCircleSolidIcon />}
                />
            </section>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 xs:gap-4">
                {handleListState()}
            </section>
        </main>
    )
}
