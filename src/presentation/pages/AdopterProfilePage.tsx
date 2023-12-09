import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useContext } from 'react'
import { AppRoutes } from '../../routes/app-routes'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/use-fetch'
import useNotify from '../hooks/use-notify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectOption } from '../../domain/models/select-option'
import { AdopterInteractor } from '../../domain/interactors/adopter-interactor'
import { AuthContext } from '../contexts/AuthContext'
import { AdopterModel } from '../../domain/models/adopter-model'
import {
    AdopterProfileFieldsValidationWrapper,
    AdopterProfileFormFields,
} from '../validations/adopter/profile-form-fields-type'
import { FieldConflict } from '../../domain/exceptions/field-conflict-error'

export const genders = [
    {
        label: 'Masculino',
        value: 'Masculino',
    },
    {
        label: 'Feminino',
        value: 'Feminino',
    },
    {
        label: 'Prefiro não dizer',
        value: 'Prefiro não dizer',
    },
]

type AdopterProfilePageProps = {
    validationWrapper: AdopterProfileFieldsValidationWrapper
    interactor: AdopterInteractor
}

export default function AdopterProfilePage({
    validationWrapper,
    interactor,
}: AdopterProfilePageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()

    const { user } = useContext(AuthContext)

    const adopter = user as AdopterModel

    const editFetch = useFetch<void>({
        fn: (fields) => interactor.edit({ ...fields }),
        successListener: (_: void) =>
            onSuccess('Cadastro atualizado com sucesso!'),
        errorListener: (error?: Error) => {
            if (error instanceof FieldConflict) {
                onFail(error.message)
            } else {
                onFail('Não foi possível atualizar o cadastro, tente novamente')
            }
        },
    })

    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
    } = useForm<AdopterProfileFormFields>({
        resolver: yupResolver<AdopterProfileFormFields>(
            validationWrapper.schema
        ),
        values: {
            name: adopter?.name,
            itr: adopter?.document,
            birthdate: adopter.birthdate,
            gender: adopter.gender,
            email: adopter.email,
            phone: adopter.phone,
            address: adopter.address,
            zipCode: adopter.zipCode,
            city: adopter.city,
            state: adopter.state,
        },
    })

    function onSuccess(message: string) {
        notify('success', message)
        editFetch.setIdle()

        window.location.reload()
    }

    function onFail(message: string) {
        notify('error', message)
        editFetch.setIdle()

        window.location.reload()
    }

    const onSubmit: SubmitHandler<AdopterProfileFormFields> = (data) =>
        editFetch.fetch(data)

    const applyITRPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.itr!.apply(
            event.target.value
        )
    }

    const applyPhonePattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.phone!.apply(
            event.target.value
        )
    }

    const applyZipCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.zipCode!.apply(
            event.target.value
        )
    }

    const today = new Date()
    const maxBirthDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    )

    return (
        <main
            className={`container-form mb-10 ${
                editFetch.isLoading()
                    ? 'pointer-events-none'
                    : 'pointer-events-auto'
            }`}
        >
            <header className="text-center text-4xl font-bold flex flex-col mb-6">
                <h1 className="text-3xl font-bold">Atualize seus dados</h1>
                <h2 className="text-lg font-light">
                    Essas informações são importantes para garantir um lar
                    seguro e amoroso aos animais
                </h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <article className={'flex flex-col gap-2'}>
                        <h3 className="text-xl font-bold">Dados pessoais</h3>
                        <div className={'flex flex-col gap-6'}>
                            <Input
                                data-selector="adopter-name-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Nome completo"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('name').invalid}
                                errorMessage={errors.name?.message}
                                {...register('name')}
                            />
                            <div className={'flex flex-col gap-6 sm:flex-row'}>
                                <Input
                                    data-selector="adopter-cpf-input"
                                    placeholder="CPF"
                                    variant="bordered"
                                    size="lg"
                                    onInput={applyITRPattern}
                                    isInvalid={getFieldState('itr').invalid}
                                    errorMessage={errors.itr?.message}
                                    {...register('itr')}
                                />
                                <Input
                                    data-selector="adopter-birthdate-input"
                                    type="date"
                                    max={
                                        maxBirthDate.toISOString().split('T')[0]
                                    }
                                    min="1950-01-01"
                                    placeholder="Data de nascimento"
                                    variant="bordered"
                                    size="lg"
                                    isInvalid={
                                        getFieldState('birthdate').invalid
                                    }
                                    errorMessage={errors.birthdate?.message}
                                    {...register('birthdate')}
                                />
                            </div>

                            <Select
                                data-selector="adopter-gender-input"
                                placeholder="Gênero"
                                variant="bordered"
                                size="md"
                                isInvalid={getFieldState('gender').invalid}
                                errorMessage={errors.gender?.message}
                                {...register('gender')}
                            >
                                {genders.map((option: SelectOption) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </article>
                </section>
                <Divider className="my-6" />
                <section className={'flex flex-col gap-2'}>
                    <h3 className="text-xl font-bold">Contato</h3>
                    <article className={'flex flex-col gap-6'}>
                        <Input
                            data-selector="adopter-email-input"
                            type="text"
                            maxLength={60}
                            placeholder="Email"
                            variant="bordered"
                            size="lg"
                            isInvalid={getFieldState('email').invalid}
                            errorMessage={errors.email?.message}
                            {...register('email')}
                        />
                        <Input
                            data-selector="adopter-phone-input"
                            placeholder="Telefone (00) 00000-0000"
                            variant="bordered"
                            size="lg"
                            onInput={applyPhonePattern}
                            isInvalid={getFieldState('phone').invalid}
                            errorMessage={errors.phone?.message}
                            {...register('phone')}
                        />
                    </article>
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Endereço</h3>
                    <article className="flex flex-col gap-6">
                        <div className={'flex flex-col gap-6 sm:flex-row'}>
                            <Input
                                data-selector="adopter-address-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Endereço"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('address').invalid}
                                errorMessage={errors.address?.message}
                                {...register('address')}
                            />
                            <Input
                                data-selector="adopter-zipcode-input"
                                placeholder="CEP"
                                variant="bordered"
                                size="lg"
                                onInput={applyZipCode}
                                isInvalid={getFieldState('zipCode').invalid}
                                errorMessage={errors.zipCode?.message}
                                {...register('zipCode')}
                            />
                        </div>
                        <div className={'flex flex-col gap-6 sm:flex-row'}>
                            <Input
                                data-selector="adopter-city-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Cidade"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('city').invalid}
                                errorMessage={errors.city?.message}
                                {...register('city')}
                            />
                            <Input
                                data-selector="adopter-state-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Estado"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('state').invalid}
                                errorMessage={errors.state?.message}
                                {...register('state')}
                            />
                        </div>
                    </article>
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-6">
                    <Button
                        data-selector="adopter-edit-button"
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                        isLoading={editFetch.isLoading()}
                    >
                        Atualizar cadastro
                    </Button>
                </section>
            </form>
        </main>
    )
}
