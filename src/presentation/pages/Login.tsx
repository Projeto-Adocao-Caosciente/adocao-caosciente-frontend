import React, { useContext } from 'react'
import { Input, Link } from '@nextui-org/react'
import LinkIcon from '../assets/LinkIcon'
import { AppRoutes } from '../../routes/app-routes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    LoginFieldsValidationWrapper,
    LoginFormFields,
} from '../validations/login/form-fields-type'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import useNotify from '../hooks/use-notify'
import { useNavigate } from 'react-router'
import LoginTemplate from '../templating/LoginTemplate'
import { AuthContext } from '../contexts/AuthContext'

type LoginPageProps = {
    validationWrapper: LoginFieldsValidationWrapper
}

export default function LoginPage({ validationWrapper }: LoginPageProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    const { isAuthenticating, authenticate } = useContext(AuthContext)

    const toggleVisibility = () => setIsVisible(!isVisible)

    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
    } = useForm({
        resolver: yupResolver<LoginFormFields>(validationWrapper.schema),
    })

    const navigate = useNavigate()
    const { notify } = useNotify()

    function onLogged() {
        notify('success', 'Login efetuado com sucesso!')
        navigate(AppRoutes.home)
    }

    function onLoginFailed() {
        notify('error', 'Usuário ou senha invalidos!')
    }

    const onSubmit: SubmitHandler<LoginFormFields> = (data) =>
        authenticate(data, onLogged, onLoginFailed)

    const applyUserPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.user!.apply(
            event.target.value
        )
    }

    return (
        <LoginTemplate
            isLoading={isAuthenticating}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            title={'Login'}
            description={
                'O seu sistema de gestão de pets e acompanhamento de adoções'
            }
            fieldsContent={
                <>
                    <Input
                        id="user"
                        placeholder="CNPJ ou CPF"
                        variant="bordered"
                        size="lg"
                        onInput={applyUserPattern}
                        isInvalid={getFieldState('user').invalid}
                        errorMessage={errors.user?.message}
                        {...register('user')}
                    />
                    <Input
                        id="password"
                        placeholder="Senha"
                        variant="bordered"
                        size="lg"
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? 'text' : 'password'}
                        isInvalid={getFieldState('password').invalid}
                        errorMessage={errors.password?.message}
                        {...register('password')}
                    />
                </>
            }
            bottomContent={
                <>
                    <p className="text-base">Não tem conta?</p>
                    <p className="text-base font-light flex gap-2">
                        Cadastre-se como um{' '}
                        <Link
                            id="register-linkup"
                            className="text-primary flex gap-1 cursor-pointer"
                            onClick={() => navigate(AppRoutes.adopterRegister)}
                        >
                            Adotante
                            <LinkIcon />
                        </Link>
                    </p>
                    <p className="text-base font-light flex gap-2">
                        Cadastre-se como uma{' '}
                        <Link
                            id="register-linkup"
                            className="text-primary flex gap-1 cursor-pointer"
                            onClick={() => navigate(AppRoutes.ongRegister)}
                        >
                            ONG
                            <LinkIcon />
                        </Link>
                    </p>
                </>
            }
        />
    )
}
