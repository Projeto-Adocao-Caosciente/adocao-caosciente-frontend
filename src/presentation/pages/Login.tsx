import React from 'react'
import Navbar from '../components/Navbar'

export default function Login() {
  return (
    <>
      <Navbar />
        <main className="xs:px-5 md:px-20 lg:px-40">
          {/* TODO: adicionar logo */}
          <h1 className="text-center xs:text-2xl md:text-3xl font-bold py-16">
            Login
          </h1>
        </main>
    </>
  )
}
