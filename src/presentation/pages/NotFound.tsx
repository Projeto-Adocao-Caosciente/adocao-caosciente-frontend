import React, {  } from 'react'
import VertLogo from '../assets/LogoVertical.png'

export default function NotFound() {

    return (
        <main className={'container-form mb-10'}>
            <section className="mb-12 sm:flex sm:justify-center sm:py-32" style={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
                <img src={VertLogo} alt={'Logo Vertical'}/>
                <section>
                    <h1 className='text-center xs:text-2xl md:text-3xl font-bold my-16'>
                        Erro 404 
                        <br/>
                        Página não encontrada
                    </h1>
                </section>
            </section>       
        </main>
    )
}