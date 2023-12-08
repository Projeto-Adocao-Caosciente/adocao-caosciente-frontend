import {
    Button,
    Divider,
    Input,
    Link,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import React from 'react'
import { AppRoutes } from '../../routes/app-routes'
import LinkIcon from '../assets/LinkIcon'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/use-fetch'
import useNotify from '../hooks/use-notify'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    AdopterFieldsValidationWrapper,
    AdopterFormFields,
} from '../validations/adopter/form-fields-type'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectOption } from '../../domain/models/select-option'
import { useBoolean } from '../hooks/use-boolean'
import { AdopterInteractor } from '../../domain/interactors/adopter-interactor'

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

type AdopterRegisterPageProps = {
    validationWrapper: AdopterFieldsValidationWrapper
    interactor: AdopterInteractor
}

export default function AdopterRegisterPage({
    validationWrapper,
    interactor,
}: AdopterRegisterPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()

    const eyeToggle = useBoolean(false)

    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
    } = useForm<AdopterFormFields>({
        resolver: yupResolver<AdopterFormFields>(validationWrapper.schema),
    })

    const registerFetch = useFetch<void>({
        fn: (fields) => interactor.register({ ...fields }),
        successListener: (_: void) =>
            onSuccess('Cadastro efetuado com sucesso!', AppRoutes.login),
        errorListener: (error?: Error) => {
            error instanceof Error ? onFail(error.message) : onFail('Não foi possível realizar o cadastro, tente novamente')
        }
    })

    function onSuccess(message: string, navigateTo?: AppRoutes) {
        notify('success', message)
        registerFetch.setIdle()

        if (navigateTo != null) {
            navigate(AppRoutes.login)
        }
    }

    function onFail(message: string) {
        notify('error', message)
        registerFetch.setIdle()
    }

    const onSubmit: SubmitHandler<AdopterFormFields> = (data) =>
        registerFetch.fetch(data)

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

    const today = new Date();
    const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return (
        <main
            className={`container-form mb-10 ${
                registerFetch.isLoading()
                    ? 'pointer-events-none'
                    : 'pointer-events-auto'
            }`}
        >
            <header className="text-center text-4xl font-bold flex flex-col mb-6">
                <h1 className="text-3xl font-bold">Cadastro</h1>
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
                                placeholder='Nome completo'
                                variant='bordered'
                                size='lg'
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
                                    type='date'
                                    max={maxBirthDate.toISOString().split('T')[0]}
                                    min='1950-01-01'
                                    placeholder='Data de nascimento'
                                    variant='bordered'
                                    size='lg'
                                    isInvalid={getFieldState('birthdate').invalid}
                                    errorMessage={errors.birthdate?.message}
                                    {...register('birthdate')}
                                />
                            </div>

                            <Select
                                data-selector='adopter-gender-input'
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
                            placeholder='Email'
                            variant='bordered'
                            size='lg'
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
                                placeholder='Endereço'
                                variant='bordered'
                                size='lg'
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
                                placeholder='Cidade'
                                variant='bordered'
                                size='lg'
                                isInvalid={getFieldState('city').invalid}
                                errorMessage={errors.city?.message}
                                {...register('city')}
                            />
                            <Input
                                data-selector="adopter-state-input"
                                minLength={2}
                                maxLength={60}
                                placeholder='Estado'
                                variant='bordered'
                                size='lg'
                                isInvalid={getFieldState('state').invalid}
                                errorMessage={errors.state?.message}
                                {...register('state')}
                            />
                        </div>
                    </article>
                </section>
                <Divider className="my-6" />
                <section className={`flex flex-col gap-2 `}>
                    <h3 className="text-xl font-bold">Dados de acesso:</h3>
                    <article className="flex flex-col gap-6">
                        <Input
                            data-selector="adopter-password-input"
                            minLength={4}
                            maxLength={60}
                            placeholder='Senha'
                            variant='bordered'
                            size='lg'
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={eyeToggle.toggle}
                                >
                                    {eyeToggle.value ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={eyeToggle.value ? 'text' : 'password'}
                            isInvalid={getFieldState('password').invalid}
                            errorMessage={errors.password?.message}
                            {...register('password')}
                        />
                        <Input
                            data-selector="adopter-password-confirmation-input"
                            minLength={4}
                            maxLength={60}
                            placeholder='Confirmar senha'
                            variant='bordered'
                            size='lg'
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={eyeToggle.toggle}
                                >
                                    {eyeToggle.value ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={eyeToggle.value ? 'text' : 'password'}
                            isInvalid={
                                getFieldState('passwordConfirmation').invalid
                            }
                            errorMessage={errors.passwordConfirmation?.message}
                            {...register('passwordConfirmation')}
                        />
                    </article>
                    <Divider className="my-6" />
                </section>
                <section className="flex flex-col gap-6">
                    <Button
                        data-selector="adopter-register-button"
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                        isLoading={registerFetch.isLoading()}
                    >
                        Finalizar cadastro
                    </Button>
                    <p className="justify-center text-lg font-light flex gap-2">
                        Já possui conta?
                        <Link
                            data-selector="adopter-register-login-link"
                            onClick={() => navigate(AppRoutes.login)}
                            className="text-primary flex gap-1 cursor-pointer"
                        >
                            Acesse
                            <LinkIcon />
                        </Link>
                    </p>
                </section>
            </form>
        </main>
    )
}
