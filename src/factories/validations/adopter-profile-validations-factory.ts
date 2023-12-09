import {
    AdopterProfileFieldsValidationWrapper,
    AdopterProfileFieldsValidationWrapperImpl,
} from '../../presentation/validations/adopter/profile-form-fields-type'

export const makeAdopterProfileValidation =
    (): AdopterProfileFieldsValidationWrapper =>
        new AdopterProfileFieldsValidationWrapperImpl()
