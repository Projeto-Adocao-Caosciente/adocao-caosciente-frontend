import { AuthService, AuthServiceImpl } from '../../data/services/auth-service'
import { makeAxiosHttpClient } from '../http/http-client-factory'

export const makeAuthService = (): AuthService =>
    new AuthServiceImpl(makeAxiosHttpClient())
