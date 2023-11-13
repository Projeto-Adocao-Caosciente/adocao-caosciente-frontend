import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    Button,
} from '@nextui-org/react'

interface PetCardProps {
    id: string
    imageSrc: string
    imageAlt: string
    title: string
}

export default function PetCard({
    id,
    imageSrc,
    imageAlt,
    title,
}: PetCardProps) {
    return (
        <Card>
            <Divider />
            <CardBody className={'p-0'}>
                <Image
                    alt={imageAlt}
                    radius="none"
                    src={imageSrc}
                    width="100%"
                    className="w-full object-cover h-[200px]"
                />
                <div className={'flex flex-col w-full p-5 gap-3'}>
                    <Link href={`pet/${id}`}>
                        <Button
                            className={'w-full'}
                            variant="solid"
                            color="primary"
                            size="md"
                        >
                            Visualizar Detalhes
                        </Button>
                    </Link>

                    {/* TODO: Tratar segundo possível caso de quando o pet tiver formulários associados a ele */}
                    <Button variant="flat" color="danger" size="md">
                        Deletar Cadastro
                    </Button>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
                <p className="text-xl font-bold">{title}</p>
            </CardFooter>
        </Card>
    )
}
