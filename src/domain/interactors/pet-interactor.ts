import { SelectOption } from '../models/select-option'
import { PetService } from '../../data/services/pet-service'
import { PetSpecialNeedsMapper } from '../mapper/pet-special-needs-mapper'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { AnimalModel } from '../models/animal-model'
import { PetsMapper } from '../mapper/pets-mapper'
import { PetMapper } from '../mapper/pet-mapper'
import { PetInvalidFoundError } from '../exceptions/pet-invalid-error'
import { PetNotFoundError } from '../exceptions/pet-not-found-error'

export interface PetInteractor {
    getSpecialNeeds: () => Promise<SelectOption[]>
    savePet: (fields: PetFormFields) => Promise<void>
    editPet: (fields: PetFormFields, id: string) => Promise<void>
    getAll: () => Promise<AnimalModel[]>
    getAllInAdoption: () => Promise<AnimalModel[]>
    get: (id: string) => Promise<AnimalModel>
}

export class PetInteractorImpl implements PetInteractor {
    constructor(
        private readonly service: PetService,
        private readonly specialNeedsMapper: PetSpecialNeedsMapper,
        private readonly petMapper: PetMapper,
        private readonly petsMapper: PetsMapper
    ) {}

    async getSpecialNeeds(): Promise<SelectOption[]> {
        const response = await this.service.getSpecialNeeds()

        return this.specialNeedsMapper.map(response)
    }

    async savePet(fields: PetFormFields): Promise<void> {
        const httpResponse = await this.service.savePet(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async editPet(fields: PetFormFields, id: string): Promise<void> {
        if (id.length <= 0) throw new PetInvalidFoundError()

        const httpResponse = await this.service.editPet(fields, id)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async getAll(): Promise<AnimalModel[]> {
        const httpResponse = await this.service.getAll()

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.petsMapper.map(httpResponse.body?.data)
            default:
                throw new UnexpectedError()
        }
    }

    async getAllInAdoption(): Promise<AnimalModel[]> {
        const httpResponse = await this.service.getAllInAdoption()

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.petsMapper.map(httpResponse.body?.data)
            default:
                throw new UnexpectedError()
        }
    }

    async get(id: string): Promise<AnimalModel> {
        if (id.length <= 0) throw new PetInvalidFoundError()

        const httpResponse = await this.service.get(id)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.petMapper.map(httpResponse.body?.data)
            case HttpStatusCode.notFound:
                throw new PetNotFoundError()
            default:
                throw new UnexpectedError()
        }
    }
}
