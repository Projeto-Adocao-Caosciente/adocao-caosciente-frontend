import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { AuthorizationResponse } from '../model/authorization-response'
import { ProfileResponse } from '../model/profile-response'
import { AUTHORIZATION_KEY, bearerBuilder } from '../../utils/build-bearer'

export interface AuthService {
    authenticate: (
        user: string,
        password: string
    ) => Promise<HttpResponse<AuthorizationResponse>>
    profile: (accessToken?: string) => Promise<HttpResponse<ProfileResponse>>
}

export class AuthServiceImpl implements AuthService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly path = {
        authenticate: '/auth/login',
        profile: '/auth/profile',
    }

    authenticate(
        user: string,
        password: string
    ): Promise<HttpResponse<AuthorizationResponse>> {
        return this.httpClient.request({
            path: this.path.authenticate,
            method: 'post',
            body: {
                user: user.replaceAll(/[./-]/g, ''),
                password,
            },
        })
    }

    profile(accessToken?: string): Promise<HttpResponse<ProfileResponse>> {
        console.log('asdjasdjasjaskdjkasbdjkas ', accessToken)

        return this.httpClient.request({
            path: this.path.profile,
            method: 'get',
            customHeaders: {
                AUTHORIZATION_KEY: bearerBuilder(accessToken ?? ''),
            },
        })
    }
}
