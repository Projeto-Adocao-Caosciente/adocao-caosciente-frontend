import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AppRoutes } from './routes/app-routes'
import ScrollTopButton from './presentation/components/ScrollTopButton'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './presentation/components/Navbar'
import { AuthProvider } from './presentation/contexts/AuthContext'
import { makeAuthenticator } from './factories/interactors/authenticator-interactor-factory'
import { makeLoginPage } from './factories/pages/login-page-factory'
import ProtectedRoute from './proxies/protected-routes'
import { makeHomePage } from './factories/pages/home-page-factory'
import {
    makeProxyAuthenticatedRule,
    makeProxyNGOAuthenticatedRule,
} from './factories/proxies/proxy-rule-solver-factory'
import { makeOngPage } from './factories/pages/ong-page-factory'
import { makePetPage } from './factories/pages/pet-page-factory'
import { makeAdopterRegisterPage } from './factories/pages/adopter-register-page-factory'
import { makeFormPage } from './factories/pages/form-page-factory'

function App() {
    const { pathname } = useLocation()
    const isNavbarVisible = pathname !== AppRoutes.login
    return (
        <AuthProvider authenticator={makeAuthenticator()}>
            {isNavbarVisible && <Navbar />}
            <Routes>
                <Route path={AppRoutes.login} element={makeLoginPage()} />
                <Route
                    path={AppRoutes.home}
                    element={
                        <ProtectedRoute
                            page={makeHomePage()}
                            ruleSolver={makeProxyAuthenticatedRule()}
                        />
                    }
                />
                <Route
                    path={AppRoutes.edit}
                    element={
                        <ProtectedRoute
                            page={makeOngPage(true)}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route path={AppRoutes.ongRegister} element={makeOngPage()} />
                <Route
                    path={AppRoutes.petRegister}
                    element={
                        <ProtectedRoute
                            page={makePetPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route
                    path={AppRoutes.pet}
                    element={
                        <ProtectedRoute
                            page={makePetPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route
                    path={AppRoutes.adopterRegister}
                    element={makeAdopterRegisterPage()}
                />
                <Route
                    path={AppRoutes.formRegister}
                    element={
                        <ProtectedRoute
                            page={makeFormPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
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
        </AuthProvider>
    )
}

export default App
