import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AppRoutes } from '../routes/app-routes'
import useNotify from '../presentation/hooks/use-notify'
import { AuthContext } from '../presentation/contexts/AuthContext'
import LoadingPage from '../presentation/pages/LoadingPage'
import { ProxyRuleSolver } from './proxy-rule-solver'
import { makeProxyAuthenticatedRule } from '../factories/proxies/proxy-rule-solver-factory'

export type ProtectedRouteProps = {
    page: JSX.Element
    ruleSolver?: ProxyRuleSolver
}

export default function ProtectedRoute({
    page,
    ruleSolver = makeProxyAuthenticatedRule(),
}: ProtectedRouteProps) {
    let location = useLocation()
    const { notify } = useNotify()
    const { user, isAuthenticated, isGettingProfile } = useContext(AuthContext)

    if (isGettingProfile) {
        return <LoadingPage />
    }

    if (
        ruleSolver.pass({
            isAuthenticated: isAuthenticated(),
            userType: user?.type,
        })
    ) {
        return page
    } else {
        notify('error', 'Você não tem autorização para acessar essa página!')
        return (
            <Navigate
                to={{ pathname: AppRoutes.login }}
                state={{ from: location }}
                replace
            />
        )
    }
}
