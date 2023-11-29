import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { OngFormFields } from '../../presentation/validations/ong/form-fields-type'

export interface OngService {
    register: (fields: OngFormFields) => Promise<HttpResponse<void>>
    edit: (fields: OngFormFields) => Promise<HttpResponse<void>>
}

export class OngServiceImpl implements OngService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly path = '/auth/register_ong'

    edit(fields: OngFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.path,
            method: 'put',
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
            },
        })
    }

    register(fields: OngFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.path,
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
}
