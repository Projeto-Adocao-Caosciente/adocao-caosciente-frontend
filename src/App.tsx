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
    makeProxyAdopterAuthenticatedRule,
    makeProxyAuthenticatedRule,
    makeProxyNGOAuthenticatedRule,
} from './factories/proxies/proxy-rule-solver-factory'
import { makeOngPage } from './factories/pages/ong-page-factory'
import { makeAdopterRegisterPage } from './factories/pages/adopter-register-page-factory'
import { makeFormPage } from './factories/pages/form-page-factory'
import NotFound from './presentation/pages/NotFound'
import { makeFormViewPage } from './factories/pages/form-view-page-factory'
import { makeNGOPetPage } from './factories/pages/ngo-pet-page-factory'
import { makeAdopterPetPage } from './factories/pages/adopter-pet-page-factory'
import { makeProfilePage } from './factories/pages/profile-page-factory'
import About from './presentation/pages/About'

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
                            page={makeProfilePage()}
                            ruleSolver={makeProxyAuthenticatedRule()}
                        />
                    }
                />
                <Route path={AppRoutes.ongRegister} element={makeOngPage()} />
                <Route
                    path={AppRoutes.petRegister}
                    element={
                        <ProtectedRoute
                            page={makeNGOPetPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route
                    path={AppRoutes.pet}
                    element={
                        <ProtectedRoute
                            page={makeNGOPetPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route
                    path={AppRoutes.adopterPet}
                    element={
                        <ProtectedRoute
                            page={makeAdopterPetPage()}
                            ruleSolver={makeProxyAdopterAuthenticatedRule()}
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
                <Route
                    path={AppRoutes.formView}
                    element={
                        <ProtectedRoute
                            page={makeFormViewPage()}
                            ruleSolver={makeProxyNGOAuthenticatedRule()}
                        />
                    }
                />
                <Route path={AppRoutes.about} element={About()} />

                <Route path={AppRoutes.notFound} element={NotFound()} />
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
