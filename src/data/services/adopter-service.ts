import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { AuthorizationResponse } from '../model/authorization-response'
import { AdopterFormFields } from '../../presentation/validations/adopter/form-fields-type'

export interface AdopterService {
    register: (fields: AdopterFormFields) => Promise<HttpResponse<void>>
    edit: (fields: AdopterFormFields) => Promise<HttpResponse<void>>
    login: (
        fields: any,
    ) => Promise<HttpResponse<AuthorizationResponse<any>>>
}

export class AdopterServiceImpl implements AdopterService {
    constructor(private readonly httpClient: AxiosHttpClient) {
    }

    private readonly registeringPath = '/adopter'

    edit(fields: AdopterFormFields): Promise<HttpResponse<void>> {
        throw new Error('unimplemented method: AdopterServiceImpl.edit')
    }

    login(
        fields: AdopterFormFields,
    ): Promise<HttpResponse<AuthorizationResponse<any>>> {
        throw new Error('unimplemented method: AdopterServiceImpl.login')
    }

    register(fields: AdopterFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.registeringPath,
            method: 'post',
            body: {
                cpf: fields.itr,
                name: fields.name,
                phone: fields.phone,
                state: fields.state,
                city: fields.city,
                address: fields.address,
                number: '',
                cep: fields.zipCode,
                birthdate: fields.birthdate,
                gender: fields.gender,
                email: fields.email,
                password: fields.password,
            },
        })
    }
}
