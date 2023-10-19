import React from 'react'
import Navbar from '../components/Navbar'
import { Divider, Input } from '@nextui-org/react'

export default function Login() {
  return (
    <>
      <Navbar />
        <main className="xs:mx-5 md:mx-20 lg:mx-72">
          {/* TODO: adicionar logo */}
          <header className="text-center text-4xl font-bold py-16">
            Login
          </header>
          <h2 className='text-center text-xl font-light'>
            Anuncie seus pets para adoção e gerencie seus formulários
          </h2>
          {/* TODO: Acertar tamanho do divider */}
          <Divider className="my-6" />
          {/* TODO: Acertar tamanho lateral da section */}
          <section className="flex justify-center gap-4 flex-col items-center">
            <Input
              placeholder="CNPJ"
              variant="bordered"
              size="lg"
            />
            <Input
              placeholder="Senha"
              variant="bordered"
              size="lg"
            />
          </section>
        </main>
    </>
  )
}
