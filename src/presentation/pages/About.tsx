import React from 'react'
import { Divider } from '@nextui-org/react'
import IcmcLogo from '../assets/IcmcLogo.png'

export default function AboutPage() {
    const contributors = [
        'Joel Felipe Coelho',
        'João Lucas Pereira e Sousa',
        'Moniely Silva Barboza',
        'Ryan Souza Sá Teles',
        'Flavio Ippolito Vasini',
        'Nicolas de Goes',
        'Ueslei Aparecido Moreira Santos Pina',
        'Murilo Franchi',
    ]

    return (
        <>
            <main className={'container-form mb-10'}>
                <h1 className={'text-3xl font-medium mb-5'}>Sobre</h1>
                <p className={'text-base font-normal mb-3'}>
                    O projeto Adoção Cãosciente visa auxiliar ONGs no processo
                    de adoção consciente, facilitando a seleção e validação dos
                    dados dos adotantes.
                </p>
                <p className={'text-base font-normal mb-3'}>
                    ONGs podem criar contratos de adoção e podem associar a
                    conta de uma pessoa como adotante para fazer o
                    preenchimento.
                </p>
                <p className={'text-base font-normal mb-10'}>
                    O propósito principal é facilitar a adoção de animais
                    resgatados e tornar o processo o mais transparente e ágil
                    possível.
                </p>

                <h2 className={'text-2xl font-medium mb-6'}>Integrantes</h2>

                {contributors.map((contributor) => {
                    return (
                        <div className={'mb-4'}>
                            <p className={'mb-4'}>{contributor}</p>
                            <Divider />
                        </div>
                    )
                })}
            </main>
            <footer className={'bg-gray-900 py-5'}>
                <div
                    className={
                        'container-form flex flex-col md:flex-row items-center gap-2 md:gap-5'
                    }
                >
                    <img src={IcmcLogo} alt={'Logo do ICMC'} width={'30%'} />
                    <p className={'text-small text-white'}>
                        SSC0536 - Projeto e Desenvolvimento de Sistemas de
                        Informação (2023)
                    </p>
                </div>
            </footer>
        </>
    )
}
