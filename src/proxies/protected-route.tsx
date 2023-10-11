import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/routes';

export type ProtectedRouteProps = {
  page: JSX.Element;
};

export default function ProtectedRoute({page}: ProtectedRouteProps) {
  // TODO: dynamize isLogged value
  const isLogged = false;

  let location = useLocation();

  if(isLogged) {
    return page;
  } else {
    return <Navigate to={{ pathname: AppRoutes.login }} state={{ from: location }} replace />;
  }
};