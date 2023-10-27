import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AppRoutes } from '../routes/app-routes'
import { useSelector } from 'react-redux'
import useNotify from '../presentation/hooks/use-notify';

export type ProtectedRouteProps = {
  page: JSX.Element
}

export default function ProtectedRoute({ page }: ProtectedRouteProps) {
  let location = useLocation()
  const {notify} = useNotify()
  // TODO: fazer uma validação melhor
  const isLogged = localStorage.getItem('access_token') ? true : false

  if (isLogged) {
    return page
  } else {
    notify("error", "Você precisa estar logado para acessar essa página!")
    localStorage.removeItem('access_token')
    return (
      <Navigate
        to={{ pathname: AppRoutes.login }}
        state={{ from: location }}
        replace
      />
    )
  }
}
