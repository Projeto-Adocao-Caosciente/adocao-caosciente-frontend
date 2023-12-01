import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { OngFormFields } from '../../presentation/validations/ong/form-fields-type'
import { FieldConflictResponse } from '../model/field-conflict-response'

export interface OngService {
    register: (fields: OngFormFields) => Promise<HttpResponse<Partial<FieldConflictResponse>>>
    edit: (fields: OngFormFields) => Promise<HttpResponse<Partial<FieldConflictResponse>>>
}

export class OngServiceImpl implements OngService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly path = {
        register: '/auth/register_ong',
        edit: '/ong',
    }

    edit(fields: OngFormFields): Promise<HttpResponse<Partial<FieldConflictResponse>>> {
        return this.httpClient.request({
            path: this.path.edit,
            method: 'patch',
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

    register(fields: OngFormFields): Promise<HttpResponse<Partial<FieldConflictResponse>>> {
        return this.httpClient.request({
            path: this.path.register,
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
