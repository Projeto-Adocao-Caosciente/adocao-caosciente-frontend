import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AppRoutes } from '../routes/app-routes'
import useNotify from '../presentation/hooks/use-notify'
import useAuth from '../presentation/hooks/use-auth'

export type ProtectedRouteProps = {
    page: JSX.Element
}

export default function ProtectedRoute({ page }: ProtectedRouteProps) {
    let location = useLocation()
    const { notify } = useNotify()
    const { getToken } = useAuth()

    const accessToken = getToken()
    const isLogged = !!accessToken

    if (isLogged) {
        return page
    } else {
        notify('error', 'Você precisa estar logado para acessar essa página!')
        return (
            <Navigate
                to={{ pathname: AppRoutes.login }}
                state={{ from: location }}
                replace
            />
        )
    }
}
