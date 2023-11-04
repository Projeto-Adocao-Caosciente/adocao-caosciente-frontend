import {
    OngEditFieldsValidationWrapperImpl,
    OngFieldsValidationWrapper,
    OngFieldsValidationWrapperImpl,
} from '../../presentation/validations/ong/form-fields-type'

export const makeOngValidation = (
    isEditing: boolean
): OngFieldsValidationWrapper =>
    isEditing
        ? new OngEditFieldsValidationWrapperImpl()
        : new OngFieldsValidationWrapperImpl()
