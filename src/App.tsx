import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'

import Login from './presentation/pages/Login'

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.home} element={<Home />} />
          <Route path={AppRoutes.login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

// TODO: remove Home after defining routes
function Home() {
  return <div></div>
}
export default App
