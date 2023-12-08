import React, { useContext } from 'react'
import { Button, Divider, Input, Link, Textarea } from '@nextui-org/react'
import InputFileImage from '../components/InputFileImage'
import LinkIcon from '../assets/LinkIcon'
import { AppRoutes } from '../../routes/app-routes'
import {
    OngFieldsValidationWrapper,
    OngFormFields,
} from '../validations/ong/form-fields-type'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fileToBase64 } from '../../utils/file-to-base64'
import { useBoolean } from '../hooks/use-boolean'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import { OngInteractor } from '../../domain/interactors/ong-interactor'
import { useFetch } from '../hooks/use-fetch'
import { useNavigate } from 'react-router'
import useNotify from '../hooks/use-notify'
import moment from 'moment'
import { OngModel } from '../../domain/models/ong-model'
import { AuthContext } from '../contexts/AuthContext'
import { FieldConflict } from '../../domain/exceptions/field-conflict-error'

type OngPageProps = {
    validationWrapper: OngFieldsValidationWrapper
    interactor: OngInteractor
    isEditing: boolean
}

export default function OngPage({
    validationWrapper,
    interactor,
    isEditing,
}: OngPageProps) {
    const navigate = useNavigate()
    const { notify } = useNotify()

    const { user } = useContext(AuthContext)

    const values = isEditing
        ? {
              avatarBase64: user?.photo ?? '',
              name: user?.name ?? '',
              user: validationWrapper.patterns.user!.apply(
                  user?.document ?? ''
              ),
              email: user?.email ?? '',
              state: user?.state ?? '',
              city: user?.city ?? '',
              phone: validationWrapper.patterns.phone!.apply(user?.phone ?? ''),
              programsAndActivities: (user as OngModel).description ?? '',
              mission: (user as OngModel).mission ?? '',
              foundationDate: moment(
                  (user as OngModel).foundation ?? '',
                  'DD-MM-YYYY'
              )
                  .format('YYYY-MM-DD')
                  .toString(),
          }
        : undefined

    const {
        register,
        handleSubmit,
        setValue,
        getFieldState,
        formState: { errors },
    } = useForm<OngFormFields>({
        resolver: yupResolver<OngFormFields>(validationWrapper.schema),
        values: values,
    })

    function deleteAccount() {
        // TODO: implement ong deletion
    }

    function onSuccess(message: string, navigateTo?: AppRoutes) {
        notify('success', message)
        registerFetch.setIdle()

        if (navigateTo != null) {
            navigate(navigateTo)
        }
    }

    function onFail(message: string) {
        notify('error', message)
        registerFetch.setIdle()
    }

    const registerFetch = useFetch<void>({
        fn: (fields) => interactor.register({ ...fields }),
        successListener: (_: void) =>
            onSuccess('Cadastro efetuado com sucesso!', AppRoutes.login),
        errorListener: (error?: Error) =>
            error instanceof FieldConflict
                ? onFail(error.message)
                : onFail(
                      'Não foi possível realizar o cadastro, tente novamente'
                  ),
    })

    const editFetch = useFetch<void>({
        fn: (fields) => interactor.edit({ ...fields }),
        successListener: (_: void) =>
            onSuccess('Edição efetuada com sucesso!', AppRoutes.home),
        errorListener: (error?: Error) =>
            error instanceof FieldConflict
                ? onFail(error.message)
                : onFail(
                      'Não foi possível realizar o cadastro, tente novamente'
                  ),
    })

    const eyeToggle = useBoolean(false)

    const onSubmit: SubmitHandler<OngFormFields> = (data) =>
        isEditing ? editFetch.fetch(data) : registerFetch.fetch(data)

    const applyUserPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.user!.apply(
            event.target.value
        )
    }

    const applyPhonePattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.phone!.apply(
            event.target.value
        )
    }

    const pageTitle = isEditing
        ? 'Atualize os dados da sua ONG'
        : 'Cadastre sua ONG'

    const pageDescription = isEditing
        ? 'Deixe os dados cadastrais de sua ONG sempre atualizados'
        : 'Assim, você pode cadastrar seus pets e gerenciar seus formulários de adoção'

    const primaryButtonLabel = isEditing
        ? 'Atualizar cadastro'
        : 'Finalizar Cadastro'

    const bottomContent = isEditing ? (
        <Button
            data-selector="ong-cancel-button"
            color="danger"
            variant="flat"
            size="md"
            onClick={() => navigate(-1)}
        >
            Cancelar
        </Button>
    ) : (
        <p className="justify-center text-lg font-light flex gap-2">
            Já possui conta?
            <Link
                onClick={() => navigate(AppRoutes.login)}
                className="text-primary flex gap-1 cursor-pointer"
            >
                Acesse
                <LinkIcon />
            </Link>
        </p>
    )

    return (
        <main
            className={`container-form mb-10 ${
                registerFetch.isLoading()
                    ? 'pointer-events-none'
                    : 'pointer-events-auto'
            }`}
        >
            <header className="text-center text-4xl font-bold flex flex-col mb-6">
                <h1 className="text-3xl font-bold">{pageTitle}</h1>
                <h2 className="text-lg font-light">{pageDescription}</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'hidden'}>
                    <Input
                        data-selector="ong-photo-validator-input"
                        placeholder="Nome da ONG"
                        variant="underlined"
                        className="w-96"
                        type={'hidden'}
                        isInvalid={getFieldState('name').invalid}
                        errorMessage={errors.name?.message}
                        {...register('name')}
                    />
                </div>
                <section className="flex justify-center mb-12">
                    {/* TODO: Centralizar o placeholder */}
                    <Input
                        data-selector="ong-name-input"
                        minLength={2}
                        maxLength={60}
                        placeholder="Nome da ONG"
                        variant="underlined"
                        className="w-96"
                        isInvalid={getFieldState('name').invalid}
                        errorMessage={errors.name?.message}
                        {...register('name')}
                    />
                </section>
                <section className="flex gap-6 flex-col items-center md:flex-row">
                    <InputFileImage
                        imageUrl={user?.photo}
                        handleImageUpload={(file) =>
                            fileToBase64(file, (base64) => {
                                setValue('avatarBase64', base64, {
                                    shouldValidate: true,
                                })
                            })
                        }
                        hasError={getFieldState('avatarBase64').invalid}
                    />
                    <article className="flex flex-1 flex-col gap-6">
                        <Input
                            data-selector="ong-cnpj-input"
                            placeholder="CNPJ (00.000.000/0000-00)"
                            variant="bordered"
                            size="lg"
                            onInput={applyUserPattern}
                            isInvalid={getFieldState('user').invalid}
                            errorMessage={errors.user?.message}
                            {...register('user')}
                        />
                        <Input
                            data-selector="ong-email-input"
                            maxLength={60}
                            placeholder="Email"
                            variant="bordered"
                            size="lg"
                            isInvalid={getFieldState('email').invalid}
                            errorMessage={errors.email?.message}
                            {...register('email')}
                        />
                        <div className="flex gap-6">
                            <Input
                                data-selector="ong-state-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Estado"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('state').invalid}
                                errorMessage={errors.state?.message}
                                {...register('state')}
                            />
                            <Input
                                data-selector="ong-city-input"
                                minLength={2}
                                maxLength={60}
                                placeholder="Cidade"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('city').invalid}
                                errorMessage={errors.city?.message}
                                {...register('city')}
                            />
                        </div>
                    </article>
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Contato:</h3>
                    <Input
                        data-selector="ong-phone-input"
                        placeholder="Telefone (00) 0 0000-0000"
                        variant="bordered"
                        size="lg"
                        onInput={applyPhonePattern}
                        isInvalid={getFieldState('phone').invalid}
                        errorMessage={errors.phone?.message}
                        {...register('phone')}
                    />
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">
                        Ajude-nos a conhecer a ONG:
                    </h3>
                    <article className="flex flex-col gap-6">
                        <Textarea
                            data-selector="ong-programs-and-activities-input"
                            placeholder="Descreva seus programas e atividades"
                            minRows={4}
                            maxRows={8}
                            maxLength={500}
                            isInvalid={
                                getFieldState('programsAndActivities').invalid
                            }
                            errorMessage={errors.programsAndActivities?.message}
                            {...register('programsAndActivities')}
                        />
                        <Textarea
                            data-selector="ong-mission-input"
                            placeholder="Missão da ONG"
                            minRows={4}
                            maxRows={8}
                            maxLength={500}
                            isInvalid={getFieldState('mission').invalid}
                            errorMessage={errors.mission?.message}
                            {...register('mission')}
                        />
                        {/* FIXME: Sobrepor placeholder */}
                        <Input
                            data-selector="ong-foundation-date-input"
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            min="1950-01-01"
                            placeholder="Data de fundação"
                            variant="bordered"
                            size="lg"
                            isInvalid={getFieldState('foundationDate').invalid}
                            errorMessage={errors.foundationDate?.message}
                            {...register('foundationDate')}
                        />
                    </article>
                </section>
                <Divider className="my-6" />
                <section
                    className={`flex flex-col gap-2 ${
                        isEditing ? 'hidden' : 'block'
                    }`}
                >
                    <h3 className="text-xl font-bold">Dados de acesso:</h3>
                    <article className="flex flex-col gap-6">
                        <Input
                            data-selector="ong-password-input"
                            minLength={4}
                            maxLength={60}
                            placeholder="Senha"
                            variant="bordered"
                            size="lg"
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
                            data-selector="ong-password-confirmation-input"
                            minLength={4}
                            maxLength={60}
                            placeholder="Confirmar senha"
                            variant="bordered"
                            size="lg"
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
                        data-selector="ong-register-button"
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                        isLoading={registerFetch.isLoading()}
                    >
                        {primaryButtonLabel}
                    </Button>
                    {bottomContent}
                </section>
            </form>
        </main>
    )
}
