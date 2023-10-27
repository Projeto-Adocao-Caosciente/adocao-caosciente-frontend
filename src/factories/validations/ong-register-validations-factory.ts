import {
    OngRegisterFieldsValidationWrapper,
    OngRegisterFieldsValidationWrapperImpl,
} from '../../presentation/validations/ong/form-fields-type'

export const makeOngRegisterValidation =
    (): OngRegisterFieldsValidationWrapper =>
        new OngRegisterFieldsValidationWrapperImpl()
