import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react'
import { AuthInteractor } from '../../domain/interactors/auth-interactor'
import {
    UserProfileModel,
    UserType,
} from '../../domain/models/user-profile-model'
import { LoginFormFields } from '../validations/login/form-fields-type'
import useAuth from '../hooks/use-auth'
import { useBoolean } from '../hooks/use-boolean'
import { AdopterModel } from '../../domain/models/adopter-model'
import { OngModel } from '../../domain/models/ong-model'

type AuthContextType = {
    isAuthenticated: () => boolean
    user: UserProfileModel | null
    getUsername: () => string
    authenticate: (
        fields: LoginFormFields,
        onAuthenticated: () => void,
        onFailed: () => void
    ) => Promise<void>
    isAuthenticating: boolean
    isGettingProfile: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export type AuthProviderProps = {
    authenticator: AuthInteractor
}

export function AuthProvider({
    authenticator,
    children,
}: PropsWithChildren<AuthProviderProps>) {
    const { setToken, removeToken, getToken } = useAuth()

    const [user, setUser] = useState<UserProfileModel | null>(null)
    const isAuthenticated = useBoolean(false)
    const isAuthenticating = useBoolean(false)
    const isGettingProfile = useBoolean(true)

    useEffect(() => {
        if (getToken()) {
            if (user == null) {
                fetchProfile()
            } else {
                isAuthenticated.setTrue()
                isGettingProfile.setFalse()
            }
        } else {
            isAuthenticated.setFalse()
            isGettingProfile.setFalse()
        }
    }, [])

    function getUsername() {
        if (user?.type == UserType.adopter) {
            return (user.data as AdopterModel)?.name ?? ''
        }

        return (user?.data as OngModel)?.name ?? ''
    }

    function fetchProfile() {
        isGettingProfile.setTrue()
        authenticator
            .profile()
            .then((user) => {
                isAuthenticated.setTrue()
                setUser(user)
            })
            .catch((_) => {
                unauthenticated()
            })
            .finally(() => isGettingProfile.setFalse())
    }

    async function authenticate(
        fields: LoginFormFields,
        onAuthenticated: () => void,
        onFailed: () => void
    ) {
        isAuthenticating.setTrue()
        try {
            const authorization = await authenticator.authenticate(
                fields.user,
                fields.password
            )
            setJwt(authorization.accessToken)

            const user = await authenticator.profile()
            setUser(user)
            isAuthenticated.setTrue()

            onAuthenticated()
        } catch (exception) {
            //isAuthenticated.setFalse()
            onFailed()
        } finally {
            isAuthenticating.setFalse()
        }
    }

    const unauthenticated = () => {
        removeJwt()
        setUser(null)
        isAuthenticated.setFalse()
    }

    const setJwt = (accessToken: string) => setToken(accessToken)

    const removeJwt = () => removeToken()

    return (
        <AuthContext.Provider
            value={{
                user,
                getUsername,
                isAuthenticated: () => isAuthenticated.value,
                authenticate,
                isAuthenticating: isAuthenticating.value,
                isGettingProfile: isGettingProfile.value,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
