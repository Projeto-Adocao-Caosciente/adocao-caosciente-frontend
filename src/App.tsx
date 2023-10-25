import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import Home from './presentation/pages/Home'
import OngEdit from './presentation/pages/OngEdit'
import OngRegister from './presentation/pages/OngRegister'
import ScrollTopButton from './presentation/components/ScrollTopButton'
import { makePetPage } from './factories/pages/pet-page-factory'
import { makeLoginPage } from './factories/pages/login-page-factory'

function App() {
    return (
        <NextUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.home} element={<Home />} />
                    <Route path={AppRoutes.login} element={makeLoginPage()} />
                    <Route path={AppRoutes.ongEdit} element={<OngEdit />} />
                    <Route
                        path={AppRoutes.ongRegister}
                        element={<OngRegister />}
                    />
                    <Route
                        path={AppRoutes.petRegister}
                        element={makePetPage()}
                    ></Route>
                </Routes>
                <ScrollTopButton />
            </BrowserRouter>
        </NextUIProvider>
    )
}

export default App
