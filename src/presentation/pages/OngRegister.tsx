import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import {
    Input,
    Divider,
    Select,
    SelectItem,
    Button,
    Textarea,
    Card,
    Link,
} from '@nextui-org/react'
import UploadIcon from '../assets/UploadIcon'
import InputFileImage from '../components/InputFileImage'
import LinkIcon from '../assets/LinkIcon'

export default function OngEdit() {
    const [image, setImage] = useState<File>(new File([], ''))
    return (
        <>
            <Navbar />
            <main className="container-form">
                <header className="text-center text-4xl font-bold flex flex-col mb-6">
                    <h1 className="text-3xl font-bold">Cadastre sua ONG</h1>
                    <h2 className="text-lg font-light">
                        Assim, você pode cadastrar seus pets e gerenciar seus
                        formulários de adoção
                    </h2>
                </header>
                <section className="flex justify-center mb-12">
                    {/* TODO: Centralizar o placeholder */}
                    <Input
                        placeholder="Nome da ONG"
                        variant="underlined"
                        className="w-96"
                    />
                </section>
                <section className="flex gap-6 xs:flex-col xs:items-center md:flex-row">
                    <InputFileImage handleImageUpload={setImage} />
                    <article className="flex flex-1 flex-col gap-6">
                        <Input
                            placeholder="CNPJ (00.000.000/0000-00)"
                            variant="bordered"
                            size="lg"
                        />
                        <Input
                            placeholder="Email"
                            variant="bordered"
                            size="lg"
                        />
                        <div className="flex gap-6">
                            <Input
                                placeholder="Estado"
                                variant="bordered"
                                size="lg"
                            />
                            <Input
                                placeholder="Cidade"
                                variant="bordered"
                                size="lg"
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
                        />
                        <Textarea
                            placeholder="Missão da ONG"
                            minRows={4}
                            maxRows={8}
                        />
                        {/* FIXME: Sobrepor placeholder */}
                        <Input
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            min="1900-01-01"
                            placeholder="Data de fundação"
                            variant="bordered"
                            size="lg"
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
                        />
                        <Input
                            placeholder="Confirmar senha"
                            variant="bordered"
                            size="lg"
                        />
                    </article>
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-6">
                    <Button color="primary" variant="solid" size="md">
                        Finalizar Cadastro
                    </Button>
                    <p className="justify-center text-lg font-light flex gap-2">
                        Já possui conta?
                        <Link
                            // TODO: Adicionar redirecionamentos
                            href={"#"}
                            className="text-primary flex gap-1"
                        >
                            Acesse
                            <LinkIcon />
                        </Link>
                    </p>
                </section>
            </main>
        </>
    )
}
