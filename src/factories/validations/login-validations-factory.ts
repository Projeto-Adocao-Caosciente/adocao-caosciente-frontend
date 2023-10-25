import {
    LoginFieldsValidationWrapper,
    LoginFieldsValidationWrapperImpl,
} from '../../presentation/validations/login/form-fields-type'

export const makeLoginValidation = (): LoginFieldsValidationWrapper =>
    new LoginFieldsValidationWrapperImpl()
