import {
    PetSpecialNeedsMapper,
    PetSpecialNeedsMapperImpl,
} from '../../domain/mapper/pet-special-needs-mapper'

export const makePetSpecialNeedsMapper = (): PetSpecialNeedsMapper =>
    new PetSpecialNeedsMapperImpl()
