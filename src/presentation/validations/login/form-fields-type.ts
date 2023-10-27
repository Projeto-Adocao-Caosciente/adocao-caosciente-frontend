import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import { commonsPatternCNPJ } from '../core/commons-patterns'

export type LoginFormFields = {
    user: string
    password: string
}

export interface LoginFieldsValidationWrapper
    extends FieldsValidationWrapper<LoginFormFields> {}

export class LoginFieldsValidationWrapperImpl
    implements LoginFieldsValidationWrapper
{
    private readonly onPasswordNotFulfilled: string = 'Campo obrigatório'

    private readonly onUserNotFulfilled: string = 'Campo obrigatório'

    private readonly onUserPatternUnmatched: string =
        'O campo deve ser preenchido corretamente'

    patterns: FieldPatternMap<LoginFormFields> = {
        user: commonsPatternCNPJ,
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
