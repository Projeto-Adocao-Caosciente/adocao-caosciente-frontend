import {
    AnimalFormListMapper,
    AnimalFormListMapperImpl,
} from '../../domain/mapper/animal-form-list-mapper'

export const makeAnimalFormListMapper = (): AnimalFormListMapper =>
    new AnimalFormListMapperImpl()
