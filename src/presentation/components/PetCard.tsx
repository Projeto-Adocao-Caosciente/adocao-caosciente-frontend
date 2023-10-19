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
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  description: string
  githubLink: string
}

export default function PetCard({ imageSrc, imageAlt, title }: PetCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <Image alt={imageAlt} radius="none" src={imageSrc} />
      </CardHeader>
      <Divider />
      <CardBody className="p-5 gap-3">
        <Button variant="solid" color="primary" size="md">
          Visualizar Detalhes
        </Button>
        {/* TODO: Tratar segundo possível caso de quando o pet tiver formulários associados a ele */}
        <Button variant="flat" color="danger" size="md">
          Deletar Cadastro
        </Button>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center">
        <p className="text-xl font-bold">{title}</p>
      </CardFooter>
    </Card>
  )
}
