import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import Home from './presentation/pages/Home'

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
