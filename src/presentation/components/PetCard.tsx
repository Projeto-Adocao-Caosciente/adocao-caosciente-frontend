import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export enum PetCardVariant {
    default,
    adoption,
}

interface PetCardProps {
    id: string
    imageSrc: string
    imageAlt: string
    title: string
    variant?: PetCardVariant
}

export default function PetCard({
    id,
    imageSrc,
    imageAlt,
    title,
    variant = PetCardVariant.default,
}: PetCardProps) {
    const navigate = useNavigate()

    return (
        <Card>
            <Divider />
            <CardBody className={'p-0'}>
                <Image
                    alt={imageAlt}
                    radius="none"
                    src={imageSrc}
                    width="100%"
                    className="w-full object-cover h-[200px] z-0"
                />
                <div className={'flex flex-col w-full p-5 gap-3'}>
                    <Button
                        className={'w-full'}
                        variant="solid"
                        color="primary"
                        size="md"
                        onClick={() => navigate(`pet/${id}`)}
                    >
                        Visualizar Detalhes
                    </Button>
                    {variant == PetCardVariant.adoption ? <Button
                        className={'w-full'}
                        variant="flat"
                        color="primary"
                        size="md"
                    >
                        Formulário de Adoção
                    </Button> : null}

                    {/* TODO: Tratar segundo possível caso de quando o pet tiver formulários associados a ele */}
                    {/*                    <Button variant="flat" color="danger" size="md">
                        Deletar Cadastro
                    </Button>*/}
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
                <p className="text-xl font-bold">{title}</p>
            </CardFooter>
        </Card>
    )
}
