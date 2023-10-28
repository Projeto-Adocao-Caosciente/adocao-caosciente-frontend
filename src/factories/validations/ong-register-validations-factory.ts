import {
    OngFieldsValidationWrapper,
    OngFieldsValidationWrapperImpl,
} from '../../presentation/validations/ong/form-fields-type'

export const makeOngValidation = (): OngFieldsValidationWrapper =>
    new OngFieldsValidationWrapperImpl()
