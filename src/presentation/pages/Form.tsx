import React from 'react'
import { Button, Card, Divider, Input, Switch } from '@nextui-org/react'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import CheckMarkIcon from '../assets/CheckMarkIcon'
import TrashCanIcon from '../assets/TrashCanIcon'
import CancelRoundedFillIcon from '../assets/CancelRoundedFilledIcon'

export default function Form({})
{
    return(
        <main className={"container-form mb-10"}>
            <header className="mb-12">
                <div className="sm:flex sm:justify-center">
                    <Input
                        placeholder="Título do Formulário..." 
                        variant="underlined"
                        className="sm:w-96 font-medium text-lg"
                    />
                </div>
            </header>

            <section>
            <Card className="md:px-6 py-8 shadow-none md:shadow-medium">
                <div className="sm:flex sm:justify-center">
                    <Input
                        placeholder="Pergunta..." 
                        variant="underlined"
                        className="sm:w-96"
                    />
                </div>
                <div className="sm:flex sm:justify-center">
                    <Switch
                        color="success"
                        size="lg"
                        thumbIcon={<CheckMarkIcon />}
                        aria-label="Marcar como correta"
                        value='correta'
                    />
                    <Input
                        placeholder="Resposta..." 
                        className="sm:w-96"
                    />
                    <Button
                        isIconOnly
                        color='danger'
                        aria-label="Remover"
                    >
                        <TrashCanIcon />
                    </Button>
                </div>
                <div className="flex justify-center ">
                    <Button
                        color="primary"
                        variant="bordered"
                        size="md"
                        type="submit"
                        endContent={<AddCircleSolidIcon />}
                    >
                        Adicionar Alternativa
                    </Button>
                </div>
                <Divider/>
                <section className="sm:flex sm:justify-evenly">
                    <Button 
                        color="danger" 
                        variant="solid" 
                        size="md"
                        endContent={<CancelRoundedFillIcon />}
                    >
                        Cancelar
                    </Button>
                    <Button
                            color="primary"
                            variant="solid"
                            size="md"
                            type="submit"
                            endContent={<AddCircleSolidIcon />}
                    >
                            Inserir Pergunta
                    </Button>
                </section>
            </Card>
            </section>

            <section className="flex flex-col gap-6">
                <Button className='font-medium text-lg'
                    color="primary"
                    variant="bordered"
                    size="md"
                    type="submit"
                    endContent={<AddCircleSolidIcon />}
                >
                    Nova pergunta
                </Button>
                <Divider className="my-6"/>
                <Button className='font-medium text-lg'
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                >
                        Finalizar Formulário
                </Button>
                <Button className='font-medium text-lg' 
                    color="danger" 
                    variant="flat" 
                    size="md">

                    Cancelar
                </Button>
            </section>
        </main>
    )
}