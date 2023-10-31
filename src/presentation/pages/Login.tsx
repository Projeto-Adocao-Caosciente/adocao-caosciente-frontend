import React from 'react'
import { Button, Divider, Input, Link, Card } from '@nextui-org/react'
import LinkIcon from '../assets/LinkIcon'
import { AppRoutes } from '../../routes/app-routes'
import Logo from '../assets/Logo.png'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    LoginFieldsValidationWrapper,
    LoginFormFields,
} from '../validations/login/form-fields-type'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import axios from 'axios'
import useNotify from '../hooks/use-notify'
import { useDispatch } from 'react-redux'
import { login } from '../reducer/userReducer'
import { useNavigate } from 'react-router'
import useAuth from '../hooks/use-auth'

type LoginPageProps = {
    validationWrapper: LoginFieldsValidationWrapper
}

export default function LoginPage({ validationWrapper }: LoginPageProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    const {
        register,
        handleSubmit,
        getFieldState,
        formState: { errors },
    } = useForm({
        resolver: yupResolver<LoginFormFields>(validationWrapper.schema),
    })

    const { notify } = useNotify()
    const { setToken } = useAuth()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
        data.user = data.user.replaceAll(/[./-]/g, '')
        const options = {
            method: 'POST',
            url: 'https://adocaosciente.onrender.com/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        }

        axios
            .request(options)
            .then(function (response) {
                // set access_token in localStorage
                const accessToken = response.data.access_token
                setToken(accessToken)
                dispatch(login(response.data.user))
                notify('success', 'Login efetuado com sucesso!')
                navigate(AppRoutes.home)
            })
            .catch(function (error) {
                notify('error', 'Usuário ou senha invalidos!')
            })
    }

    const applyUserPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = validationWrapper.patterns.user!.apply(
            event.target.value
        )
    }

    return (
        <main className="container flex flex-col justify-center items-center min-h-[100vh]">
            <img src={Logo} className="md:mb-10" />
            <Card className="md:px-6 pt-8 max-w-[400px] shadow-none md:shadow-medium">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <header className="text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                    </header>
                    <h2 className="text-center text-xl font-light">
                        Anuncie seus pets para adoção e gerencie seus
                        formulários
                    </h2>
                    <Divider className="my-6" />
                    <section className="flex justify-center gap-4 flex-col items-center mb-10">
                        <Input
                            id="cnpj"
                            placeholder="CNPJ"
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
                    </section>
                    <section className="flex justify-center gap-6 flex-col mb-6">
                        <Button
                            id="login-button"
                            color="primary"
                            variant="solid"
                            size="lg"
                            type="submit"
                        >
                            Login
                        </Button>
                        <p className="justify-center text-base font-light flex gap-2">
                            Não tem conta?
                            <Link
                                id="register-linkup"
                                className="text-primary flex gap-1 cursor-pointer"
                                onClick={() => navigate(AppRoutes.ongRegister)}
                            >
                                Cadastre-se
                                <LinkIcon />
                            </Link>
                        </p>
                    </section>
                </form>
            </Card>
        </main>
    )
}
