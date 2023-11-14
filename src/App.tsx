import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import ScrollTopButton from './presentation/components/ScrollTopButton'
import { makePetPage } from './factories/pages/pet-page-factory'
import { makeLoginPage } from './factories/pages/login-page-factory'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './proxies/protected-routes'
import { makeOngPage } from './factories/pages/ong-page-factory'
import Navbar from './presentation/components/Navbar'
import { makeHomePage } from './factories/pages/home-page-factory'

function App() {
    const { pathname } = useLocation()
    const isNavbarVisible = pathname !== AppRoutes.login
    return (
        <>
            {isNavbarVisible && <Navbar />}
            <Routes>
                <Route path={AppRoutes.login} element={makeLoginPage()} />
                <Route
                    path={AppRoutes.home}
                    element={<ProtectedRoute page={makeHomePage()} />}
                />
                <Route
                    path={AppRoutes.ongEdit}
                    element={<ProtectedRoute page={makeOngPage(true)} />}
                />
                <Route path={AppRoutes.ongRegister} element={makeOngPage()} />
                <Route
                    path={AppRoutes.petRegister}
                    element={<ProtectedRoute page={makePetPage()} />}
                />
                <Route
                    path={AppRoutes.pet}
                    element={<ProtectedRoute page={makePetPage()} />}
                />
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
        </>
    )
}

export default App
