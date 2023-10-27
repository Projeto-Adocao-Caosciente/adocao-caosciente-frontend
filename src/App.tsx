import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import Home from './presentation/pages/Home'
import OngEdit from './presentation/pages/OngEdit'
import ScrollTopButton from './presentation/components/ScrollTopButton'
import { makePetPage } from './factories/pages/pet-page-factory'
import { makeLoginPage } from './factories/pages/login-page-factory'
import { makeOngRegisterPage } from './factories/pages/ong-register-page-factory'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './proxies/protected-routes'
import { makeOngRegisterPage } from './factories/pages/ong-register-page-factory'

function App() {
    return (
        <NextUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.login} element={makeLoginPage()} />
                    <Route
                        path={AppRoutes.home}
                        element={<ProtectedRoute page={<Home />} />}
                    />
                    <Route
                        path={AppRoutes.ongEdit}
                        element={<ProtectedRoute page={<OngEdit />} />}
                    />
                    <Route
                        path={AppRoutes.ongRegister}
                        element={makeOngRegisterPage()}
                    />
                    <Route
                        path={AppRoutes.petRegister}
                        element={<ProtectedRoute page={makePetPage()} />}
                    ></Route>
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    draggable={false}
                    pauseOnFocusLoss
                    closeOnClick
                    pauseOnHover
                />
                <ScrollTopButton />
            </BrowserRouter>
        </NextUIProvider>
    )
}

export default App
