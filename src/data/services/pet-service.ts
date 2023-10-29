import { SelectOptionResponse } from '../model/select-option-response'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { AxiosHttpClient, HttpResponse } from '../http/http-client'

export interface PetService {
    getSpecialNeeds: () => Promise<SelectOptionResponse[]>
    savePet: (fields: PetFormFields) => Promise<HttpResponse<void>>
}

export class PetServiceImpl implements PetService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly registeringPath = '/pet/register'

    // TODO: consumir via backend
    getSpecialNeeds(): Promise<SelectOptionResponse[]> {
        return Promise.resolve([
            {
                name: 'Cegueira',
                value: 'cegueira',
            },
            {
                name: 'Surdez',
                value: 'surdez',
            },
        ])
    }

    savePet(fields: PetFormFields): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.registeringPath,
            method: 'post',
            body: {
                ...fields,
            },
        })
    }
}
