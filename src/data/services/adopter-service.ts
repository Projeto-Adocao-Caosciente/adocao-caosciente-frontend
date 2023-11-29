import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { AdopterFormFields } from '../../presentation/validations/adopter/form-fields-type'

export interface AdopterService {
    register: (fields: AdopterFormFields) => Promise<HttpResponse<void>>
    edit: (fields: AdopterFormFields) => Promise<HttpResponse<void>>
}

export class AdopterServiceImpl implements AdopterService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly path = '/auth/register_adopter'

    edit(fields: AdopterFormFields): Promise<HttpResponse<void>> {
        throw new Error('unimplemented method: AdopterServiceImpl.edit')
    }

    register(fields: AdopterFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.path,
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
