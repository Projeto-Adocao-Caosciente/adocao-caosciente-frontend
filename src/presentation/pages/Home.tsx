import { Button } from '@nextui-org/react'
import React from 'react'

export default function Home() {
  return (
    <>
    {/* TODO: Adicionar Navbar */}
    <h1 className="text-center text-3xl font-bold">Home</h1>
    <div className="flex items-center justify-center">
        <h2>Pets cadastrados</h2>
        <Button color="primary" variant="solid" size="lg">Cadastrar um novo Pet</Button>
    </div>
    </>
  )
}
