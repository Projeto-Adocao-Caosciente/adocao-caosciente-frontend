import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Input, Divider, Button, Textarea, Link } from '@nextui-org/react'
import InputFileImage from '../components/InputFileImage'
import LinkIcon from '../assets/LinkIcon'
import { AppRoutes } from '../../routes/app-routes'
import {
    OngRegisterFieldsValidationWrapper,
    OngRegisterFormFields,
} from '../validations/ong/form-fields-type'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fileToBase64 } from '../../utils/file-to-base64'
import { useBoolean } from '../hooks/use-boolean'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'

type OngRegisterPageProps = {
    validationWrapper: OngRegisterFieldsValidationWrapper
}

export default function OngRegister({
    validationWrapper,
}: OngRegisterPageProps) {
    const {
        register,
        handleSubmit,
        setValue,
        getFieldState,
        formState: { errors },
    } = useForm<OngRegisterFormFields>({
        resolver: yupResolver<OngRegisterFormFields>(validationWrapper.schema),
    })

    const eyeToggle = useBoolean(false)

    const onSubmit: SubmitHandler<OngRegisterFormFields> = (data) =>
        console.log(data)

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

    return (
        <>
            <Navbar />
            <main className="container-form mb-10">
                <header className="text-center text-4xl font-bold flex flex-col mb-6">
                    <h1 className="text-3xl font-bold">Cadastre sua ONG</h1>
                    <h2 className="text-lg font-light">
                        Assim, você pode cadastrar seus pets e gerenciar seus
                        formulários de adoção
                    </h2>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'hidden'}>
                        <Input
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
                            placeholder="Nome da ONG"
                            variant="underlined"
                            className="w-96"
                            isInvalid={getFieldState('name').invalid}
                            errorMessage={errors.name?.message}
                            {...register('name')}
                        />
                    </section>
                    <section className="flex gap-6 xs:flex-col xs:items-center md:flex-row">
                        <InputFileImage
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
                                placeholder="CNPJ (00.000.000/0000-00)"
                                variant="bordered"
                                size="lg"
                                onInput={applyUserPattern}
                                isInvalid={getFieldState('user').invalid}
                                errorMessage={errors.user?.message}
                                {...register('user')}
                            />
                            <Input
                                placeholder="Email"
                                variant="bordered"
                                size="lg"
                                isInvalid={getFieldState('email').invalid}
                                errorMessage={errors.email?.message}
                                {...register('email')}
                            />
                            <div className="flex gap-6">
                                <Input
                                    placeholder="Estado"
                                    variant="bordered"
                                    size="lg"
                                    isInvalid={getFieldState('state').invalid}
                                    errorMessage={errors.state?.message}
                                    {...register('state')}
                                />
                                <Input
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
                                placeholder="Descreva seus programas e atividades"
                                minRows={4}
                                maxRows={8}
                                isInvalid={
                                    getFieldState('programsAndActivities')
                                        .invalid
                                }
                                errorMessage={
                                    errors.programsAndActivities?.message
                                }
                                {...register('programsAndActivities')}
                            />
                            <Textarea
                                placeholder="Missão da ONG"
                                minRows={4}
                                maxRows={8}
                                isInvalid={getFieldState('mission').invalid}
                                errorMessage={errors.mission?.message}
                                {...register('mission')}
                            />
                            {/* FIXME: Sobrepor placeholder */}
                            <Input
                                type="date"
                                max={new Date().toISOString().split('T')[0]}
                                min="1900-01-01"
                                placeholder="Data de fundação"
                                variant="bordered"
                                size="lg"
                                isInvalid={
                                    getFieldState('foundationDate').invalid
                                }
                                errorMessage={errors.foundationDate?.message}
                                {...register('foundationDate')}
                            />
                        </article>
                    </section>
                    <Divider className="my-6" />
                    <section className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold">Dados de acesso:</h3>
                        <article className="flex flex-col gap-6">
                            <Input
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
                                    getFieldState('passwordConfirmation')
                                        .invalid
                                }
                                errorMessage={
                                    errors.passwordConfirmation?.message
                                }
                                {...register('passwordConfirmation')}
                            />
                        </article>
                    </section>
                    <Divider className="my-6" />
                    <section className="flex flex-col gap-6">
                        <Button
                            color="primary"
                            variant="solid"
                            size="md"
                            type="submit"
                        >
                            Finalizar Cadastro
                        </Button>
                        <p className="justify-center text-lg font-light flex gap-2">
                            Já possui conta?
                            <Link
                                // TODO: Adicionar redirecionamentos
                                href={AppRoutes.login}
                                className="text-primary flex gap-1"
                            >
                                Acesse
                                <LinkIcon />
                            </Link>
                        </p>
                    </section>
                </form>
            </main>
        </>
    )
}
