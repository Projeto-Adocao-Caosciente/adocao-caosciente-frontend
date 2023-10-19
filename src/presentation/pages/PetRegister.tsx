import React from 'react'
import Navbar from '../components/Navbar'
import {
    Input,
    Divider,
    Select,
    SelectItem,
    Button,
    Textarea,
} from '@nextui-org/react'
import UploadIcon from '../assets/UploadIcon'

export default function PetRegister() {
    const dummyList = [
        {
            label: 'Cegueira',
            value: 'cegueira',
        },
        {
            label: 'Surdez',
            value: 'surdez',
        },
    ]
    return (
        <>
            <Navbar />
            {/* FIXME: Ajeitar margem */}
            <main className="xs:mx-5 md:mx-20 lg:mx-72">
                <section className="flex justify-center mb-12">
                    {/* TODO: Centralizar o placeholder */}
                    <Input
                        placeholder="Qual o nome do seu Pet?"
                        variant="underlined"
                        className="w-96"
                    />
                </section>
                <section className="flex justify-center gap-8 xs:flex-col xs:items-center md:flex-row ">
                    {/* TODO: Tornar isso um Input file image  */}
                    <article className="rounded-full border border-black w-[210px] h-[210px] flex justify-center items-center">
                        <UploadIcon height={100} width={100} />
                    </article>
                    <article className="flex flex-col gap-6">
                        <Input
                            placeholder="Raça"
                            variant="bordered"
                            size="lg"
                        />
                        <Input
                            placeholder="Tipo"
                            variant="bordered"
                            size="lg"
                        />
                        <div className="flex gap-6">
                            <Input
                                placeholder="Altura"
                                variant="bordered"
                                size="lg"
                            />
                            <Input
                                placeholder="Peso"
                                variant="bordered"
                                size="lg"
                            />
                        </div>
                    </article>
                </section>
                {/* TODO: Definir comprimento adequado para ficar bom na tela */}
                <Divider className="my-6" />
                <section className="pl-4">
                    <h3 className="text-xl font-bold">
                        Necessidades Especiais:{' '}
                    </h3>
                    {/* TODO: permitir que o select ocupe 100% de width */}
                    <Select
                        label="Favorite Animal"
                        placeholder="Select an animal"
                        selectionMode="multiple"
                        variant="bordered"
                        size="lg"
                        className="max-w-xs"
                    >
                        {dummyList.map((deficiencia) => (
                            <SelectItem
                                key={deficiencia.value}
                                value={deficiencia.value}
                            >
                                {deficiencia.label}
                            </SelectItem>
                        ))}
                    </Select>
                </section>
                <Divider className="my-6" />
                <section>
                    <h3 className="text-xl font-bold">
                        Informações adicionais:{' '}
                    </h3>
                    <Textarea
                        placeholder="Anotações..."
                        minRows={4}
                        maxRows={8}
                    />
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-6">
                    <Button color="primary" variant="solid" size="md">
                        Cadastrar
                    </Button>
                    <Button color="danger" variant="flat" size="md">
                        Cancelar
                    </Button>
                </section>
            </main>
        </>
    )
}
