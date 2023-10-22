import React, { useEffect } from 'react'
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
import { useFetch } from '../hooks/use-fetch'
import { SelectOption } from '../../domain/models/select-option'
import { PetInteractor } from '../../domain/interactors/pet-interactor'

type Props = {
    interactor: PetInteractor
}

export default function PetPage({ interactor }: Props) {
    const pet = useFetch<SelectOption[]>(() => interactor.getSpecialNeeds())

    useEffect(() => {
        pet.fetch().then()
    }, [])

    return (
        <>
            <Navbar />
            {/* FIXME: Ajeitar margem */}
            <main className="px-5 md:px-0 mx-auto max-w-[600px] pt-4">
                <section className="mb-12">
                    <div className="sm:flex sm:justify-center">
                        <Input
                            placeholder="Qual o nome do seu Pet?"
                            variant="underlined"
                            className="sm:w-96"
                        />
                    </div>
                </section>
                <section>
                    <div className="md:flex">
                        {/* TODO: Tornar isso um Input file image  */}
                        <div className="flex justify-center md:block items-center pb-10 md:pb-0">
                            <div className="rounded-full border border-black w-[210px] h-[210px] flex justify-center items-center">
                                <UploadIcon height={100} width={100} />
                            </div>
                        </div>
                        <div className="w-full md:ml-8">
                            <h3 className="text-xl font-bold mb-2">
                                Dados do pet:
                            </h3>
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
                                <div className="flex flex-col sm:flex-row gap-6">
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
                        </div>
                    </div>
                </section>
                <Divider className="my-6" />
                <section>
                    <h3 className="text-xl font-bold mb-2">
                        Necessidades Especiais:
                    </h3>
                    <Select
                        placeholder="Selecione as opções"
                        selectionMode="multiple"
                        variant="bordered"
                        size="md"
                    >
                        {(pet.state?.data ?? []).map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </section>
                <Divider className="my-6" />
                <section>
                    <h3 className="text-xl font-bold mb-2">
                        Informações adicionais:
                    </h3>
                    <Textarea
                        label="Anotações:"
                        labelPlacement="inside"
                        variant="bordered"
                        minRows={4}
                        maxRows={8}
                    />
                </section>
                <Divider className="my-6" />
                <section className="flex flex-col gap-6 pb-6 sm:pb-12 md:pb-24">
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
