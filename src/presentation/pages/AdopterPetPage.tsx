import React, { useEffect } from 'react'
import {
    Button,
    Chip,
    Divider,
    Input,
    Skeleton,
    Textarea,
} from '@nextui-org/react'
import { Status, useFetch } from '../hooks/use-fetch'
import { PetInteractor } from '../../domain/interactors/pet-interactor'
import InputFileImage from '../components/InputFileImage'
import { AppRoutes } from '../../routes/app-routes'
import { useNavigate } from 'react-router'
import useNotify from '../hooks/use-notify'
import { AnimalModel } from '../../domain/models/animal-model'
import { useParams } from 'react-router-dom'

type AdopterPetPageProps = {
    petInteractor: PetInteractor
}

export default function AdopterPetPage({ petInteractor }: AdopterPetPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()
    const petId = useParams().id ?? ''
    const hasPetId = petId.length > 0

    const petDetailFetch = useFetch<AnimalModel>({
        fn: (_) => petInteractor.getInAdoption(petId),
        initialState: {
            status: hasPetId ? Status.loading : Status.idle,
        },
        errorListener: () => {
            notify('error', 'Não foi possível encontrar esse pet')
            petDetailFetch.setIdle()
            navigate(-1)
        },
    })

    useEffect(() => {
        petDetailFetch.fetch().then()
    }, [])

    return (
        <main className={`container-form mb-10`}>
            <section className="mb-12">
                <div className="sm:flex sm:justify-center">
                    <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                        <Input
                            data-selector="pet-name-input"
                            key={petDetailFetch.state.data?.name}
                            minLength={2}
                            maxLength={60}
                            placeholder="Qual o nome do seu Pet?"
                            defaultValue={petDetailFetch.state.data?.name}
                            variant="flat"
                            className="sm:w-96"
                            isDisabled
                        />
                    </Skeleton>
                </div>
            </section>
            <section className="flex gap-6 flex-col items-center md:flex-row">
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <InputFileImage
                        data-selector="pet-photo-input"
                        key={petDetailFetch.state.data?.photo}
                        imageUrl={petDetailFetch.state.data?.photo}
                        isDisabled
                    />
                </Skeleton>
                <article className="flex flex-1 flex-col gap-6">
                    <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                        <Input
                            data-selector="pet-breed-input"
                            key={petDetailFetch.state.data?.breed}
                            minLength={2}
                            maxLength={60}
                            placeholder="Raça"
                            variant="flat"
                            size="lg"
                            type="text"
                            defaultValue={petDetailFetch.state.data?.breed}
                            isDisabled
                        />
                    </Skeleton>

                    <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                        <Input
                            data-selector="pet-kind-input"
                            key={petDetailFetch.state.data?.type}
                            minLength={2}
                            maxLength={60}
                            placeholder="Tipo"
                            variant="flat"
                            size="lg"
                            type="text"
                            defaultValue={petDetailFetch.state.data?.type}
                            isDisabled
                        />
                    </Skeleton>

                    <div className="flex gap-6">
                        <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                            <Input
                                data-selector="pet-height-input"
                                key={petDetailFetch.state.data?.height}
                                placeholder="Altura"
                                variant="flat"
                                size="lg"
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            cm
                                        </span>
                                    </div>
                                }
                                defaultValue={petDetailFetch.state.data?.height}
                                isDisabled={hasPetId}
                            />
                        </Skeleton>
                        <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                            <Input
                                data-selector="pet-weight-input"
                                key={petDetailFetch.state.data?.weight}
                                placeholder="Peso"
                                variant="flat"
                                size="lg"
                                defaultValue={petDetailFetch.state.data?.weight}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">
                                            kg
                                        </span>
                                    </div>
                                }
                                isDisabled
                            />
                        </Skeleton>
                    </div>
                </article>
            </section>
            <Divider className="my-6" />
            <section>
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <h3 className="text-xl font-bold mb-2">
                        Necessidades Especiais:
                    </h3>
                </Skeleton>

                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <div
                        data-selector="pet-special-needs-input"
                        key={petDetailFetch.state.data?.special_needs.length}
                        className={'flex flex-wrap gap-2'}
                    >
                        {(petDetailFetch.state.data?.special_needs ?? [])
                            .length > 0 ? (
                            (
                                petDetailFetch.state.data?.special_needs ?? []
                            ).map((specialNeed, index) => {
                                return <Chip key={index}>{specialNeed}</Chip>
                            })
                        ) : (
                            <Chip>
                                Esse pet não tem nenhuma necessidade especial
                            </Chip>
                        )}
                    </div>
                </Skeleton>
            </section>
            <Divider className="my-6" />
            <section>
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <h3 className="text-xl font-bold mb-2">
                        Informações adicionais:
                    </h3>
                </Skeleton>
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <Textarea
                        data-selector="pet-aditional-information-input"
                        maxLength={500}
                        label="Anotações:"
                        labelPlacement="inside"
                        variant="flat"
                        defaultValue={petDetailFetch.state.data?.aditionalInfo}
                        minRows={4}
                        maxRows={8}
                        isDisabled
                    />
                </Skeleton>
            </section>
            <Divider className="my-6" />
            <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                <section className="flex flex-col gap-6">
                    <Button
                        data-selector="pet-cancel-button"
                        color="danger"
                        variant="flat"
                        size="md"
                        onClick={() => navigate(AppRoutes.home)}
                    >
                        {hasPetId ? 'Voltar' : 'Cancelar'}
                    </Button>
                </section>
            </Skeleton>
        </main>
    )
}
