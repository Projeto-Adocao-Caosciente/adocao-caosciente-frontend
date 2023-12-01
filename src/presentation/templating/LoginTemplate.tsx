import React from 'react'
import { Button, Divider, Card } from '@nextui-org/react'
import Logo from '../assets/Logo.png'
import {
    FieldValues,
    SubmitHandler,
    UseFormHandleSubmit,
} from 'react-hook-form'

type LoginPageProps<Fields extends FieldValues> = {
    onSubmit: SubmitHandler<Fields>
    isLoading: boolean
    title: string
    description: string
    handleSubmit: UseFormHandleSubmit<Fields>
    fieldsContent: React.JSX.Element
    bottomContent: React.JSX.Element
}

export default function LoginTemplate<Fields extends FieldValues>({
    onSubmit,
    isLoading,
    title,
    description,
    handleSubmit,
    fieldsContent,
    bottomContent,
}: LoginPageProps<Fields>) {
    const [isVisible, setIsVisible] = React.useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <main
            className={`container flex flex-col justify-center items-center min-h-[100vh] ${
                isLoading ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
        >
            <img src={Logo} className="md:mb-10" alt={'logo'} />
            <Card className="md:px-6 pt-8 max-w-[400px] shadow-none md:shadow-medium">
                <header className="text-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                </header>
                <h2 className="text-center text-xl font-light">
                    {description}
                </h2>

                <Divider className="my-6" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex justify-center gap-4 flex-col items-center mb-10">
                        {fieldsContent}
                    </section>
                    <section className="flex justify-center gap-6 flex-col mb-6">
                        <Button
                            id="login-button"
                            color="primary"
                            variant="solid"
                            size="lg"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                        {bottomContent}
                    </section>
                </form>
            </Card>
        </main>
    )
}
