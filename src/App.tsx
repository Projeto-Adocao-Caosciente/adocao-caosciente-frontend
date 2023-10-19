import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import Home from './presentation/pages/Home'
import PetRegister from './presentation/pages/PetRegister'

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
          <Route path={AppRoutes.petRegister} element={<PetRegister />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
