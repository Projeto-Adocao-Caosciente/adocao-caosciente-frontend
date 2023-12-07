import React from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
} from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { appRouteParamReplace } from '../../utils/app-route-param-replace'
import { AppRoutes } from '../../routes/app-routes'

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

    const detailRoute = appRouteParamReplace(
        variant == PetCardVariant.adoption
            ? AppRoutes.adopterPet
            : AppRoutes.pet,
        ':id',
        id
    )

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
                        data-selector="pet-card-view-details-button"
                        className={'w-full'}
                        variant="solid"
                        color="primary"
                        size="md"
                        onClick={() => navigate(detailRoute)}
                    >
                        Visualizar Detalhes
                    </Button>
                    {variant == PetCardVariant.adoption ? (
                        <Button
                            data-selector="pet-card-view-forms-button"
                            className={'w-full'}
                            variant="flat"
                            color="primary"
                            size="md"
                        >
                            Formulário de Adoção
                        </Button>
                    ) : null}
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
                <p data-selector="pet-card-name" className="text-xl font-bold">{title}</p>
            </CardFooter>
        </Card>
    )
}
