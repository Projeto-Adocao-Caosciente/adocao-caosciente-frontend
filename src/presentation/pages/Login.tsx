import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Divider, Input, Link, Card } from '@nextui-org/react'
import LinkIcon from '../assets/LinkIcon'
import { AppRoutes } from '../../routes/app-routes'
import Logo from '../assets/Logo.png'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginFormFields = {
    user: string
    password: string
}

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormFields>()

    const onSubmit: SubmitHandler<LoginFormFields> = (data) => console.log(data)

    return (
        <>
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
                                placeholder="CNPJ"
                                variant="bordered"
                                size="lg"
                                {...register('user')}
                            />
                            <Input
                                placeholder="Senha"
                                variant="bordered"
                                size="lg"
                                {...register('password')}
                            />
                        </section>
                        <section className="flex justify-center gap-6 flex-col mb-6">
                            <Button
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
                                    href={AppRoutes.ongRegister}
                                    className="text-primary flex gap-1"
                                >
                                    Cadastre-se
                                    <LinkIcon />
                                </Link>
                            </p>
                        </section>
                    </form>
                </Card>
            </main>
        </>
    )
}
