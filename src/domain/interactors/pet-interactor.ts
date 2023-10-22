import { SelectOption } from '../models/select-option'
import { PetService } from '../../data/services/pet-service'
import { PetMapper } from '../mapper/pet-mapper'

export interface PetInteractor {
    getSpecialNeeds: () => Promise<SelectOption[]>
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
}
