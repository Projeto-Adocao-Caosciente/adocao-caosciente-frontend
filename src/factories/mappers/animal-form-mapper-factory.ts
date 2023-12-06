import {
    AnimalFormMapper,
    AnimalFormMapperImpl,
} from '../../domain/mapper/animal-form-mapper'

export const makeAnimalFormMapper = (): AnimalFormMapper =>
    new AnimalFormMapperImpl()
