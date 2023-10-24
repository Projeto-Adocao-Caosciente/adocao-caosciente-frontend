import { PetMapper, PetMapperImpl } from '../../domain/mapper/pet-mapper'

export const makePetMapper = (): PetMapper => new PetMapperImpl()
