import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { OngFormFields } from '../../presentation/validations/ong/form-fields-type'
import { LoginFormFields } from '../../presentation/validations/login/form-fields-type'
import { AuthorizationResponse } from '../model/authorization-response'
import { OngModel } from '../../presentation/models/ongModel'

export interface OngService {
    register: (fields: OngFormFields) => Promise<HttpResponse<void>>
    login: (
        fields: LoginFormFields
    ) => Promise<HttpResponse<AuthorizationResponse<OngModel>>>
}

export class OngServiceImpl implements OngService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly registeringPath = '/register'
    private readonly loginPath = '/login'

    register(fields: OngFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.registeringPath,
            method: 'post',
            body: {
                cnpj: fields.user.replaceAll(/[./-]/g, ''),
                name: fields.name,
                logo: fields.avatarBase64,
                city: fields.city,
                state: fields.state,
                phone: fields.phone,
                email: fields.email,
                mission: fields.mission,
                foundation: fields.foundationDate,
                description: fields.programsAndActivities,
                password: fields.password,
            },
        })
    }

    login(
        fields: LoginFormFields
    ): Promise<HttpResponse<AuthorizationResponse<OngModel>>> {
        return this.httpClient.request({
            path: this.loginPath,
            method: 'post',
            body: {
                user: fields.user.replaceAll(/[./-]/g, ''),
                password: fields.password,
            },
        })
    }
}
