import { UserType } from '../domain/models/user-profile-model'
import React, { useContext } from 'react'
import { AppRoutes } from '../routes/app-routes'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../presentation/contexts/AuthContext'

type RenderByUserParams = {
    ngoRender: React.JSX.Element
    adopterRender: React.JSX.Element
}

export const renderByUserType = ({
    ngoRender,
    adopterRender,
}: RenderByUserParams) => {
    const { user } = useContext(AuthContext)

    if (user?.type == UserType.adopter) {
        return adopterRender
    }

    if (user?.type == UserType.ngo) {
        return ngoRender
    }

    // TODO: Implement error page
    return (
        <Navigate
            to={{ pathname: AppRoutes.login }}
            state={{ from: location }}
            replace
        />
    )
}
