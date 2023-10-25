import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'

export type LoginFormFields = {
    user: string
    password: string
}

export interface LoginFieldsValidationWrapper
    extends FieldsValidationWrapper<LoginFormFields> {
    onUserNotFulfilled: string
    onUserPatternUnmatched: string
    onPasswordNotFulfilled: string
}

export class LoginFieldsValidationWrapperImpl
    implements LoginFieldsValidationWrapper
{
    onPasswordNotFulfilled: string = 'Campo obrigatório'

    onUserNotFulfilled: string = 'Campo obrigatório'

    onUserPatternUnmatched: string = 'O campo deve ser preenchido corretamente'

    patterns: FieldPatternMap<LoginFormFields> = {
        user: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        password: undefined,
    }

    schema = yup
        .object({
            user: yup
                .string()
                .required(this.onUserNotFulfilled)
                .matches(<RegExp>this.patterns.user, {
                    message: this.onUserPatternUnmatched,
                }),
            password: yup.string().required(this.onPasswordNotFulfilled),
        })
        .required()
}
