import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import {
    Input,
    Divider,
    Select,
    SelectItem,
    Button,
    Textarea,
} from '@nextui-org/react'
import { useFetch } from '../hooks/use-fetch'
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

type PetPageProps = {
    validationWrapper: PetFieldsValidationWrapper
    interactor: PetInteractor
}

export default function PetPage({
    validationWrapper,
    interactor,
}: PetPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()

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
        pet.setIdle()
        navigate(AppRoutes.home)
    }

    function onRegisterFailed(_?: Error) {
        notify('error', 'Não foi possível realizar o cadastro, tente novamente')
        pet.setIdle()
    }

    const specialNeedsFetch = useFetch<SelectOption[]>({
        fn: () => interactor.getSpecialNeeds(),
    })

    const pet = useFetch<void>({
        fn: (fields) => interactor.savePet({ ...fields }),
        successListener: onRegistered,
        errorListener: onRegisterFailed,
    })

    const onSubmit: SubmitHandler<PetFormFields> = (data) => pet.fetch(data)

    useEffect(() => {
        specialNeedsFetch.fetch().then()
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
                pet.isLoading() ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className="mb-12">
                    <div className="sm:flex sm:justify-center">
                        <Input
                            placeholder="Qual o nome do seu Pet?"
                            variant="underlined"
                            className="sm:w-96"
                            isInvalid={getFieldState('name').invalid}
                            errorMessage={errors.name?.message}
                            {...register('name')}
                        />
                    </div>
                </section>
                <section className="flex gap-6 flex-col items-center md:flex-row">
                    <InputFileImage
                        handleImageUpload={(file) =>
                            fileToBase64(file, (base64) => {
                                setValue('photoBase64', base64, {
                                    shouldValidate: true,
                                })
                            })
                        }
                        hasError={getFieldState('photoBase64').invalid}
                    />
                    <article className="flex flex-1 flex-col gap-6">
                        <Input
                            placeholder="Raça"
                            variant="bordered"
                            size="lg"
                            type="text"
                            onInput={applyBreedPattern}
                            isInvalid={getFieldState('breed').invalid}
                            errorMessage={errors.breed?.message}
                            {...register('breed')}
                        />
                        <Input
                            placeholder="Tipo"
                            variant="bordered"
                            size="lg"
                            type="text"
                            onInput={applyKindPattern}
                            isInvalid={getFieldState('kind').invalid}
                            errorMessage={errors.kind?.message}
                            {...register('kind')}
                        />
                        <div className="flex gap-6">
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
                                {...register('height')}
                            />
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
                                {...register('weight')}
                            />
                        </div>
                    </article>
                </section>
                <Divider className="my-6" />
                <section>
                    <h3 className="text-xl font-bold mb-2">
                        Necessidades Especiais:
                    </h3>
                    <Select
                        placeholder="Selecione as opções"
                        selectionMode="multiple"
                        variant="bordered"
                        size="md"
                        value={''}
                        defaultValue={''}
                        isInvalid={getFieldState('specialNeeds').invalid}
                        errorMessage={errors.specialNeeds?.message}
                        {...register('specialNeeds')}
                    >
                        {(specialNeedsFetch.state?.data ?? []).map(
                            (option: SelectOption) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            )
                        )}
                    </Select>
                </section>
                <Divider className="my-6" />
                <section>
                    <h3 className="text-xl font-bold mb-2">
                        Informações adicionais:
                    </h3>
                    <Textarea
                        label="Anotações:"
                        labelPlacement="inside"
                        variant="bordered"
                        minRows={4}
                        maxRows={8}
                        isInvalid={
                            getFieldState('additionalInformation').invalid
                        }
                        errorMessage={errors.additionalInformation?.message}
                        {...register('additionalInformation')}
                    />
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-6">
                    <Button
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                        isLoading={pet.isLoading()}
                    >
                        Cadastrar
                    </Button>
                    <Button color="danger" variant="flat" size="md">
                        Cancelar
                    </Button>
                </section>
            </form>
        </main>
    )
}
