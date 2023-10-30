import { SelectOptionResponse } from '../model/select-option-response'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { AxiosHttpClient, HttpResponse } from '../http/http-client'

export interface PetService {
    getSpecialNeeds: () => Promise<SelectOptionResponse[]>
    savePet: (fields: PetFormFields) => Promise<HttpResponse<void>>
}

export class PetServiceImpl implements PetService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly registeringPath = '/animal'

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
        const specialNeeds = () => {
            if (
                typeof fields.specialNeeds === 'string' &&
                fields.specialNeeds.length > 0
            ) {
                return fields.specialNeeds.split(',')
            } else {
                return []
            }
        }

        return this.httpClient.request({
            path: this.registeringPath,
            method: 'post',
            body: {
                name: fields.name,
                type: fields.kind,
                breed: fields.breed,
                height: fields.height,
                weight: fields.weight,
                special_needs: specialNeeds(),
                adoption_requirements: [],
                photo: fields.photoBase64,
                adopter: '',
                aditional_info: fields.additionalInformation,
            },
        })
    }
}
