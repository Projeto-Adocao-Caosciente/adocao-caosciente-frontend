import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Divider, Input } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import LinkIcon from '../assets/LinkIcon'

export default function Login() {
  return (
    <>
    {/* FIX: acertar largura dos componentes na página e suas responsividades */}
    {/* FEATURE: conectar ao banco e fazer checagens necessárias p/ funcionamento do botão de login*/}
    {/* FIX: remover navbar? */}
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
          <section className="flex justify-center gap-6 flex-col py-16
          ">
            <Button color="primary" variant="solid" size="lg">
              Login
            </Button>
            <h2 className='justify-center text-lg font-light flex gap-2'>
              Não tem conta?  
              <Link to={'/ong/cadastro'} className='text-primary flex felx-col gap-1'>
                Cadastre-se 
                <LinkIcon/>
              </Link>
            </h2>
          </section>
        </main>
    </>
  )
}
