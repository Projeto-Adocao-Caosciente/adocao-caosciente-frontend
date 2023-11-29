import React, { useEffect } from 'react'
import {
    Button,
    Divider,
    Input,
    Select,
    SelectItem,
    Skeleton,
    Textarea,
} from '@nextui-org/react'
import { Status, useFetch } from '../hooks/use-fetch'
import { SelectOption } from '../../domain/models/select-option'
import { PetInteractor } from '../../domain/interactors/pet-interactor'
import InputFileImage from '../components/InputFileImage'
import { fileToBase64 } from '../../utils/file-to-base64'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    PetFieldsValidationWrapper,
    PetFormFields,
} from '../validations/pet/form-fields-type'
import { AppRoutes } from '../../routes/app-routes'
import { useNavigate } from 'react-router'
import useNotify from '../hooks/use-notify'
import { AnimalModel } from '../../domain/models/animal-model'
import { useParams } from 'react-router-dom'

type PetPageProps = {
    validationWrapper: PetFieldsValidationWrapper
    interactor: PetInteractor
}

export const specialNeeds = [
    {
        label: 'Surdez',
        value: 'surdez',
    },
    {
        label: 'Cegueira',
        value: 'cegueira',
    },
]

export default function PetPage({
    validationWrapper,
    interactor,
}: PetPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()
    const petId = useParams().id ?? ''
    const hasPetId = petId.length > 0

    const petDetailFetch = useFetch<AnimalModel>({
        fn: (_) => interactor.get(petId),
        initialState: {
            status: hasPetId ? Status.loading : Status.idle,
        },
        successListener: (data) => {
            setValue('breed', data?.breed ?? '')
            setValue('height', data?.height ?? '')
            setValue('weight', data?.weight ?? '')
            setValue('specialNeeds', data?.special_needs ?? [])
            setValue('kind', data?.type ?? '')
            setValue('photoBase64', data?.photo ?? '')
            setValue('name', data?.name ?? '')
        },
        errorListener: () => {
            notify('error', 'Não foi possível encontrar esse pet')
            petDetailFetch.setIdle()
            navigate(AppRoutes.home)
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        getFieldState,
        formState: { errors },
    } = useForm<PetFormFields>({
        resolver: yupResolver<PetFormFields>(validationWrapper.schema),
    })

    function onRegistered(_: void) {
        notify('success', 'Cadastro efetuado com sucesso!')
        petRegister.setIdle()
        navigate(AppRoutes.home)
    }

    function onRegisterFailed(_?: Error) {
        notify('error', 'Não foi possível realizar o cadastro, tente novamente')
        petRegister.setIdle()
    }

    function onEdited(_: void) {
        notify('success', 'Dados do pet atualizado efetuado com sucesso!')
        petEdit.setIdle()
        navigate(AppRoutes.home)
    }

    function onEditFailed(_?: Error) {
        notify(
            'error',
            'Não foi possível atualizar os dados do pet, tente novamente'
        )
        petEdit.setIdle()
    }

    const petRegister = useFetch<void>({
        fn: (fields) => interactor.savePet({ ...fields }),
        successListener: onRegistered,
        errorListener: onRegisterFailed,
    })

    // @ts-ignore
    const petEdit = useFetch<void>({
        fn: (fields) => interactor.editPet({ ...fields }, petId),
        successListener: onEdited,
        errorListener: onEditFailed,
    })

    const onSubmit: SubmitHandler<PetFormFields> = (data) =>
        hasPetId ? petEdit.fetch(data) : petRegister.fetch(data)

    useEffect(() => {
        if (hasPetId) {
            petDetailFetch.fetch().then()
        }
    }, [])

    const applyWeightPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.weight!.apply(
            event.target.value
        )
    }

    const applyHeightPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.height!.apply(
            event.target.value
        )
    }

    const applyKindPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.kind!.apply(
            event.target.value
        )
    }

    const applyBreedPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.breed!.apply(
            event.target.value
        )
    }

    return (
        // FIXME: Ajeitar margem
        <main
            className={`container-form mb-10 ${
                petRegister.isLoading()
                    ? 'pointer-events-none'
                    : 'pointer-events-auto'
            }`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="mb-12">
                    <div className="sm:flex sm:justify-center">
                        <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                            <Input
                                placeholder="Qual o nome do seu Pet?"
                                variant="underlined"
                                className="sm:w-96"
                                isInvalid={getFieldState('name').invalid}
                                errorMessage={errors.name?.message}
                                isDisabled={hasPetId}
                                {...register('name')}
                            />
                        </Skeleton>
                    </div>
                </section>
                <section className="flex gap-6 flex-col items-center md:flex-row">
                    <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                        <InputFileImage
                            handleImageUpload={(file) =>
                                fileToBase64(file, (base64) => {
                                    setValue('photoBase64', base64, {
                                        shouldValidate: true,
                                    })
                                })
                            }
                            isDisabled={hasPetId}
                            hasError={getFieldState('photoBase64').invalid}
                        />
                    </Skeleton>
                    <article className="flex flex-1 flex-col gap-6">
                        <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                            <Input
                                placeholder="Raça"
                                variant="bordered"
                                size="lg"
                                type="text"
                                onInput={applyBreedPattern}
                                isInvalid={getFieldState('breed').invalid}
                                errorMessage={errors.breed?.message}
                                isDisabled={hasPetId}
                                {...register('breed')}
                            />
                        </Skeleton>

                        <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                            <Input
                                placeholder="Tipo"
                                variant="bordered"
                                size="lg"
                                type="text"
                                onInput={applyKindPattern}
                                isInvalid={getFieldState('kind').invalid}
                                errorMessage={errors.kind?.message}
                                isDisabled={hasPetId}
                                {...register('kind')}
                            />
                        </Skeleton>

                        <div className="flex gap-6">
                            <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                                <Input
                                    placeholder="Altura"
                                    variant="bordered"
                                    size="lg"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                cm
                                            </span>
                                        </div>
                                    }
                                    onInput={applyHeightPattern}
                                    isInvalid={getFieldState('height').invalid}
                                    errorMessage={errors.height?.message}
                                    isDisabled={hasPetId}
                                    {...register('height')}
                                />
                            </Skeleton>
                            <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                                <Input
                                    placeholder="Peso"
                                    variant="bordered"
                                    size="lg"
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">
                                                kg
                                            </span>
                                        </div>
                                    }
                                    onInput={applyWeightPattern}
                                    isInvalid={getFieldState('weight').invalid}
                                    errorMessage={errors.weight?.message}
                                    isDisabled={hasPetId}
                                    {...register('weight')}
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
                    <SpecialNeedsSelect
                        key={Math.random()}
                        selected={
                            petDetailFetch.state.data?.special_needs ?? []
                        }
                        invalid={getFieldState('specialNeeds').invalid}
                        error={errors.specialNeeds?.message}
                        register={register('specialNeeds')}
                        isDisabled={hasPetId}
                        isLoading={petDetailFetch.isLoading()}
                    />
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
                            label="Anotações:"
                            labelPlacement="inside"
                            variant="bordered"
                            minRows={4}
                            maxRows={8}
                            isInvalid={
                                getFieldState('additionalInformation').invalid
                            }
                            isDisabled={hasPetId}
                            errorMessage={errors.additionalInformation?.message}
                            {...register('additionalInformation')}
                        />
                    </Skeleton>
                </section>
                <Divider className="my-6" />
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <section className="flex flex-col gap-6">
                        {!hasPetId ? (
                            <Button
                                color="primary"
                                variant="solid"
                                size="md"
                                type="submit"
                                isLoading={
                                    hasPetId
                                        ? petEdit.isLoading()
                                        : petRegister.isLoading()
                                }
                            >
                                Cadastrar
                            </Button>
                        ) : null}
                        <Button
                            color="danger"
                            variant="flat"
                            size="md"
                            onClick={() => navigate(AppRoutes.home)}
                        >
                            {hasPetId ? 'Voltar' : 'Cancelar'}
                        </Button>
                    </section>
                </Skeleton>
            </form>
        </main>
    )
}

type SpecialNeedsSelectProps = {
    isLoading: boolean
    selected: string[]
    error?: string
    invalid: boolean
    register?: any
    isDisabled: boolean
}

function SpecialNeedsSelect({
    isLoading,
    selected,
    error,
    invalid,
    isDisabled,
    register,
}: SpecialNeedsSelectProps) {
    return (
        <Skeleton isLoaded={!isLoading}>
            <Select
                placeholder="Selecione as opções"
                selectionMode="multiple"
                variant="bordered"
                size="md"
                defaultSelectedKeys={selected}
                isInvalid={invalid}
                errorMessage={error}
                isDisabled={isDisabled}
                {...register}
            >
                {specialNeeds.map((option: SelectOption) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </Skeleton>
    )
}
