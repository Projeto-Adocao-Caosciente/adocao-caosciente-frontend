import { PetsMapper, PetsMapperImpl } from '../../domain/mapper/pets-mapper'

export const makePetsMapper = (): PetsMapper => new PetsMapperImpl()
