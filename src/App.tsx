import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import Home from './presentation/pages/Home'
import OngEdit from './presentation/pages/OngEdit'
import ScrollTopButton from './presentation/components/ScrollTopButton'

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
          <Route path={AppRoutes.ongEdit} element={<OngEdit />} />
        </Routes>
        <ScrollTopButton />
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
