import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'

export type LoginFormFields = {
    user: string
    password: string
}

export interface LoginFieldsValidationWrapper
    extends FieldsValidationWrapper<LoginFormFields> {}

export class LoginFieldsValidationWrapperImpl
    implements LoginFieldsValidationWrapper
{
    onPasswordNotFulfilled: string = 'Campo obrigatório'

    onUserNotFulfilled: string = 'Campo obrigatório'

    onUserPatternUnmatched: string = 'O campo deve ser preenchido corretamente'

    patterns: FieldPatternMap<LoginFormFields> = {
        user: {
            // Regex for CNPJ - 00.000.000/0000-00
            matcher: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            apply: (value) =>
                value
                    .replace(/\D+/g, '')
                    .replace(/(\d{2})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1/$2')
                    .replace(/(\d{4})(\d)/, '$1-$2')
                    .replace(/(-\d{2})\d+?$/, '$1'),
        },
        password: undefined,
    }

    schema = yup
        .object({
            user: yup
                .string()
                .required(this.onUserNotFulfilled)
                .matches(<RegExp>this.patterns?.user?.matcher, {
                    message: this.onUserPatternUnmatched,
                }),
            password: yup.string().required(this.onPasswordNotFulfilled),
        })
        .required()
}
