import { SelectOptionResponse } from '../model/select-option-response'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { AxiosHttpClient, HttpRequest, HttpResponse } from '../http/http-client'
import { AnimalModel } from '../../domain/models/animal-model'
import { AnimalsResponse } from '../model/animals-response'
import { AnimalResponse } from '../model/animal-response'
import { string } from 'yup'
import { Method } from 'axios'

export interface PetService {
    getSpecialNeeds: () => Promise<SelectOptionResponse[]>
    savePet: (fields: PetFormFields) => Promise<HttpResponse<void>>
    editPet: (fields: PetFormFields, id: string) => Promise<HttpResponse<void>>
    getAll: () => Promise<HttpResponse<AnimalsResponse>>
    getAllInAdoption: () => Promise<HttpResponse<AnimalsResponse>>
    get: (id: string) => Promise<HttpResponse<AnimalResponse>>
}

export class PetServiceImpl implements PetService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly registeringPath = '/animals'
    private readonly editingPath = '/animals'
    private readonly getAllPath = '/ong/animals'
    private readonly getAllInAdoptionPath = '/adopter/animals'
    private readonly getPath = '/ong/animals'

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
        return this._makePetSaveAndUpdateRequest(
            fields,
            this.registeringPath,
            'post'
        )
    }

    editPet(fields: PetFormFields, id: string): Promise<HttpResponse<void>> {
        return this._makePetSaveAndUpdateRequest(
            fields,
            `${this.editingPath}/${id}`,
            'put'
        )
    }

    getAll(): Promise<HttpResponse<AnimalsResponse>> {
        return this.httpClient.request<AnimalsResponse>({
            path: this.getAllPath,
            method: 'get',
        })
    }

    getAllInAdoption(): Promise<HttpResponse<AnimalsResponse>> {
        return this.httpClient.request<AnimalsResponse>({
            path: this.getAllInAdoptionPath,
            method: 'get',
        })
    }

    get(id: string): Promise<HttpResponse<AnimalResponse>> {
        return this.httpClient.request<AnimalResponse>({
            path: `${this.getPath}/${id}`,
            method: 'get',
        })
    }

    _makePetSaveAndUpdateRequest(
        fields: PetFormFields,
        path: string,
        method: Method
    ): Promise<HttpResponse<void>> {
        const specialNeeds = () => {
            if (
                typeof fields.specialNeeds === 'string' &&
                fields.specialNeeds.length > 0
            ) {
                return fields.specialNeeds.split(',')
            }

            return fields.specialNeeds
        }

        return this.httpClient.request({
            path: path,
            method: method,
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
