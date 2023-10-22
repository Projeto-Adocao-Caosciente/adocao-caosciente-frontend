import { Button, Input } from '@nextui-org/react'
import React from 'react'
import PetCard from '../components/PetCard'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import Navbar from '../components/Navbar'

export default function Home() {
  const dummyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  return (
    <>
      <Navbar />
      <main className="container">
        <h1 className="text-center xs:text-2xl md:text-3xl font-bold py-16">
          Bem-vindo de volta
          <br />
          ONG NOME_ONG
        </h1>
        <section className="flex mb-4 md:justify-between">
          <h2 className="text-3xl">Pets cadastrados</h2>
          <Button
            color="primary"
            variant="solid"
            size="lg"
            className="xs:hidden md:block"
          >
            Cadastrar um novo Pet
          </Button>
        </section>
        <section className="flex gap-4 mb-8">
          <Input
            variant="bordered"
            placeholder="Pesquisar por nome"
            size="lg"
          />
          <Button
            isIconOnly
            color="primary"
            variant="solid"
            size="lg"
            className="md:hidden"
            startContent={<AddCircleSolidIcon />}
          />
        </section>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 xs:gap-4">
          {dummyArray.map((value, index) => {
            return (
              <PetCard
                imageSrc="https://unsplash.it/500/500"
                imageAlt="Imagem de um cachorro"
                title="Nome do Pet"
                description="Descrição do Pet"
                githubLink="aaa"
                subtitle="Raça do Pet"
                key={index + Math.random()}
              />
            )
          })}
        </section>
      </main>
    </>
  )
}
