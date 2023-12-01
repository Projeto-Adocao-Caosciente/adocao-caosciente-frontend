import { useCookies } from 'react-cookie'

export default function useAuth() {
    const [cookies, setCookie, removeCookie] = useCookies()

    const setToken = (token: string) =>
        setCookie('token', token, { maxAge: 3600 })

    const getToken: () => Partial<string> = () => cookies.token

    const removeToken: () => void = () => removeCookie('token')

    return {
        setToken,
        getToken,
        removeToken,
    }
}
