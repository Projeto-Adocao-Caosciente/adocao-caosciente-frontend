import { SelectOption } from '../models/select-option'
import { PetService } from '../../data/services/pet-service'
import { PetMapper } from '../mapper/pet-mapper'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { AnimalModel } from '../../presentation/models/animal-model'
import { PetsMapper } from '../mapper/pets-mapper'

export interface PetInteractor {
    getSpecialNeeds: () => Promise<SelectOption[]>
    savePet: (fields: PetFormFields) => Promise<void>
    getAll: () => Promise<AnimalModel[]>
}

export class PetInteractorImpl implements PetInteractor {
    constructor(
        private readonly service: PetService,
        private readonly petMapper: PetMapper,
        private readonly petsMapper: PetsMapper
    ) {}

    async getSpecialNeeds(): Promise<SelectOption[]> {
        const response = await this.service.getSpecialNeeds()

        return this.petMapper.map(response)
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

    async getAll(): Promise<AnimalModel[]> {
        const httpResponse = await this.service.getAll()

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.petsMapper.map(httpResponse.body)
            default:
                throw new UnexpectedError()
        }
    }
}
