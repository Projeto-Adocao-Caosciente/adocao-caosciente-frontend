import React, { useEffect } from 'react'
import {
    Button,
    Divider,
    Input,
    Link,
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
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { AnimalFormListModel } from '../../domain/models/animal-form-list-model'
import { FaCirclePlus } from 'react-icons/fa6'
import { appRouteParamReplace } from '../../utils/app-route-param-replace'
import LinkIcon from '../assets/LinkIcon'

type NGOPetPageProps = {
    validationWrapper: PetFieldsValidationWrapper
    petInteractor: PetInteractor
    formInteractor: FormInteractor
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

export default function NGOPetPage({
    validationWrapper,
    petInteractor,
    formInteractor,
}: NGOPetPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()
    const petId = useParams().id ?? ''
    const hasPetId = petId.length > 0

    function populateFields(data?: AnimalModel | undefined) {
        setValue('breed', data?.breed ?? '')
        setValue('height', data?.height ?? '')
        setValue('weight', data?.weight ?? '')
        setValue('specialNeeds', data?.special_needs ?? [])
        setValue('kind', data?.type ?? '')
        setValue('photoBase64', data?.photo ?? '')
        setValue('name', data?.name ?? '')
    }

    const petDetailFetch = useFetch<AnimalModel>({
        fn: (_) => petInteractor.get(petId),
        initialState: {
            status: hasPetId ? Status.loading : Status.idle,
        },
        successListener: populateFields,
        errorListener: () => {
            notify(
                'error',
                'Não foi possível encontrar o Pet desejado. Por favor, tente novamente mais tarde.'
            )
            petDetailFetch.setIdle()
            navigate(AppRoutes.home)
        },
    })

    const petAdoptionFormsFetch = useFetch<AnimalFormListModel>({
        fn: (_) => formInteractor.getAnimalForms(petId),
        initialState: {
            status: hasPetId ? Status.loading : Status.idle,
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
        fn: (fields) => petInteractor.savePet({ ...fields }),
        successListener: onRegistered,
        errorListener: onRegisterFailed,
    })

    // @ts-ignore
    const petEdit = useFetch<void>({
        fn: (fields) => petInteractor.editPet({ ...fields }, petId),
        successListener: onEdited,
        errorListener: onEditFailed,
    })

    const onSubmit: SubmitHandler<PetFormFields> = (data) =>
        hasPetId ? petEdit.fetch(data) : petRegister.fetch(data)

    useEffect(() => {
        if (hasPetId) {
            petDetailFetch.fetch().then()
            petAdoptionFormsFetch.fetch().then()
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

    const buildAdoptionFormList = () => {
        if (petAdoptionFormsFetch.hasError()) {
            return (
                <p data-selector='form-error-list'>
                    Não foi possível buscar os formulários de adoção atrelados a
                    esse animal
                </p>
            )
        }

        if (petAdoptionFormsFetch.hasSucceeded()) {
            if ((petAdoptionFormsFetch.state.data?.length ?? 0) <= 0) {
                return (
                    <div data-selector='form-empty-list'>
                        <p className="text-base font-light">
                            Não existem formulários de adoção atrelados a esse
                            animal
                        </p>
                        <Link
                            className="text-primary flex gap-1 cursor-pointer"
                            onClick={() =>
                                navigate(
                                    appRouteParamReplace(
                                        AppRoutes.formRegister,
                                        ':animalId',
                                        petId
                                    )
                                )
                            }
                        >
                            Adicionar formulário
                            <LinkIcon />
                        </Link>
                    </div>
                )
            } else {
                return (
                    <div className={'flex flex-wrap items-center gap-2 mb-2'} data-selector='form-section'>
                        {(petAdoptionFormsFetch.state.data ?? []).map(
                            (form) => (
                                <Button
                                    data-selector='view-form'
                                    color={'primary'}
                                    variant={'bordered'}
                                    key={form.formId}
                                    onClick={() =>
                                        navigate(
                                            appRouteParamReplace(
                                                AppRoutes.formView,
                                                ':formId',
                                                form.formId
                                            )
                                        )
                                    }
                                >
                                    {form.formTitle}
                                </Button>
                            )
                        )}
                        <Button
                            data-selector='form-add'
                            color={'primary'}
                            variant={'bordered'}
                            isIconOnly
                            onClick={() =>
                                navigate(
                                    appRouteParamReplace(
                                        AppRoutes.formRegister,
                                        ':animalId',
                                        petId
                                    )
                                )
                            }
                        >
                            <FaCirclePlus />
                        </Button>
                    </div>
                )
            }
        }
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
                                data-selector='pet-name-input'
                                minLength={2}
                                maxLength={60}
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
                            key={petDetailFetch.state.data?.photo}
                            imageUrl={petDetailFetch.state.data?.photo}
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
                                data-selector='pet-breed-input'
                                minLength={2}
                                maxLength={60}
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
                                data-selector='pet-kind-input'
                                minLength={2}
                                maxLength={60}
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
                                    data-selector='pet-height-input'
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
                                    data-selector='pet-weight-input'
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
                        data-selector='pet-special-needs-input'
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
                            data-selector='pet-additional-information-input'
                            maxLength={500}
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
                {hasPetId ? (
                    <section className={'pb-6'}>
                        <Skeleton
                            isLoaded={
                                !(
                                    petDetailFetch.isLoading() ||
                                    petAdoptionFormsFetch.isLoading()
                                )
                            }
                        >
                            <h3 className="text-xl font-bold mb-2">
                                Formulários:
                            </h3>
                        </Skeleton>
                        <Skeleton
                            isLoaded={
                                !(
                                    petDetailFetch.isLoading() &&
                                    petAdoptionFormsFetch.isLoading()
                                )
                            }
                        >
                            {buildAdoptionFormList()}
                        </Skeleton>
                    </section>
                ) : null}
                <Skeleton isLoaded={!petDetailFetch.isLoading()}>
                    <section className="flex flex-col gap-6">
                        {!hasPetId ? (
                            <Button
                                data-selector='pet-register-button'
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
                            data-selector='pet-cancel-button'
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
