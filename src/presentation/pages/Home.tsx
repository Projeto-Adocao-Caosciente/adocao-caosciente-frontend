import { Button, Input, Link } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import Navbar from '../components/Navbar'
import { AppRoutes } from '../../routes/app-routes'
import { AnimalModel } from '../models/AnimalModel'
import axios from 'axios'
import { Status, useFetch } from '../hooks/use-fetch'
import { useDispatch, useSelector } from 'react-redux'
import { OngModel } from '../models/ongModel'
import { setAnimals } from '../reducer/animalsReducer'

export default function Home() {
    const access_token = localStorage.getItem('access_token')
    const animalsRequest = useFetch<any>(() =>
        axios.get('https://adocaosciente.onrender.com/ong/animals', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
    )
    const dispatch = useDispatch()
    useEffect(() => {
        animalsRequest.fetch()
        dispatch(setAnimals(animalsRequest.state.data?.data?.data.animals))
    }, [])

    const ongData: OngModel = useSelector((state: any) => state.user.ong)
    return (
        <>
            <Navbar />
            <main className="container mb-10">
                <h1 className="text-center xs:text-2xl md:text-3xl font-bold py-16">
                    Bem-vindo de volta
                    <br />
                    {ongData.name}
                </h1>
                <section className="flex mb-4 md:justify-between">
                    <h2 className="text-3xl">Pets cadastrados</h2>
                    <Link href={AppRoutes.petRegister}>
                        <Button
                            color="primary"
                            variant="solid"
                            size="lg"
                            className="xs:hidden md:block"
                        >
                            Cadastrar um novo Pet
                        </Button>
                    </Link>
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
                    {/* TODO: Implementar skeleton loading */}
                    {animalsRequest.state.status === Status.success ? (
                        animalsRequest.state.data?.data?.data.animals?.map((animal: AnimalModel, index: number) => {
                            return (
                                <PetCard
                                    imageSrc={animal.photo}
                                    imageAlt="Imagem de um cachorro"
                                    title={animal.name}
                                    key={index + Math.random()}
                                />
                            )
                        })
                    ) : (
                        <div className="flex justify-center items-center">
                            <p className="text-2xl font-bold">Nenhum pet cadastrado</p>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}
