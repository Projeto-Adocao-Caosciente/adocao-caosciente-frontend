import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { AuthorizationResponse } from '../model/authorization-response'
import { ProfileResponse } from '../model/profile-response'

export interface AuthService {
    authenticate: (
        user: string,
        password: string
    ) => Promise<HttpResponse<AuthorizationResponse>>
    profile: () => Promise<HttpResponse<ProfileResponse>>
}

export class AuthServiceImpl implements AuthService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly path = {
        authenticate: 'login',
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

    profile(): Promise<HttpResponse<ProfileResponse>> {
        return this.httpClient.request({
            path: this.path.profile,
            method: 'get',
        })
    }
}
