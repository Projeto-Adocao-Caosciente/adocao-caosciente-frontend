import { SelectOption } from '../models/select-option'
import { PetService } from '../../data/services/pet-service'
import { PetMapper } from '../mapper/pet-mapper'
import { PetFormFields } from '../../presentation/validations/pet/form-fields-type'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'

export interface PetInteractor {
    getSpecialNeeds: () => Promise<SelectOption[]>
    savePet: (fields: PetFormFields) => Promise<void>
}

export class PetInteractorImpl implements PetInteractor {
    constructor(
        private readonly service: PetService,
        private readonly mapper: PetMapper
    ) {}

    async getSpecialNeeds(): Promise<SelectOption[]> {
        const response = await this.service.getSpecialNeeds()

        return this.mapper.map(response)
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
}
