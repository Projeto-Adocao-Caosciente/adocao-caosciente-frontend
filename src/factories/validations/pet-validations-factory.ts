import {
    PetFieldsValidationWrapper,
    PetFieldsValidationWrapperImpl,
} from '../../presentation/validations/pet/form-fields-type'

export const makePetValidation = (): PetFieldsValidationWrapper =>
    new PetFieldsValidationWrapperImpl()
