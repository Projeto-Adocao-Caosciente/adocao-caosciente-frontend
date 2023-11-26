import {
    AdopterFieldsValidationWrapper,
    AdopterFieldsValidationWrapperImpl,
} from '../../presentation/validations/adopter/form-fields-type'

export const makeAdopterRegisterValidation = (): AdopterFieldsValidationWrapper => new AdopterFieldsValidationWrapperImpl()
