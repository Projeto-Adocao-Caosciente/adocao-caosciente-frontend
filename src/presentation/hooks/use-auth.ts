import { useCookies } from 'react-cookie'

export default function useAuth() {
    const [cookies, setCookie, removeCookie] = useCookies()

    const setToken = (token: string) => {
        setCookie('token', token, { maxAge: 3600 })
    }

    const getToken = () => {
        return cookies.token
    }

    const isAuthenticated = () => {
        return cookies.token !== undefined
    }

    const removeToken = () => {
        removeCookie('token')
    }

    return {
        setToken,
        getToken,
        isAuthenticated,
        removeToken,
    }
}
