import React, {  } from 'react'
import VertLogo from '../assets/LogoVertical.png'
import { Navigate } from 'react-router-dom'
import { Button } from '@nextui-org/react';

export default function NotFound() {

    const telaAnterior = () => {

        console.log(window.history.length);
        if(window.history.length <= 2)
        {
            console.log("caiu");
            window.location.href = '/'
            return
        }

        window.history.back();
        return 
    }

    return (
        <main className={'container-form mb-10'}>
            <section className="mb-12 sm:flex sm:justify-center sm:py-24" style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
                <img src={VertLogo} alt={'Logo Vertical'}/>
                <section>
                    <h1 className='text-center xs:text-2xl md:text-3xl font-bold my-16'>
                        Erro 404 
                        <br/>
                        Página não encontrada
                    </h1>
                </section>
                    <Button
                        color="primary"
                        variant="solid"
                        size="lg"
                        className='w-40'
                        onClick={() => telaAnterior()}
                    >
                        Voltar
                    </Button>
            </section>       
        </main>
    )
}