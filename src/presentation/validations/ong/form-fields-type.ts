import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import {
    commonsPatternCNPJ,
    commonsPatternPhone,
} from '../core/commons-patterns'

export type OngRegisterFormFields = {
    avatarBase64: string
    name: string
    user: string
    email: string
    state: string
    city: string
    phone: string
    programsAndActivities: string
    mission: string
    foundationDate: string
    password: string
    passwordConfirmation: string
}

export interface OngRegisterFieldsValidationWrapper
    extends FieldsValidationWrapper<OngRegisterFormFields> {}

export class OngRegisterFieldsValidationWrapperImpl
    implements OngRegisterFieldsValidationWrapper
{
    private readonly onUserNotFulfilled: string = 'Campo obrigatório'

    private readonly onUserPatternUnmatched: string =
        'O campo deve ser preenchido corretamente'

    private readonly invalidEmailMessage = 'Digite um email válido'
    private readonly missingFieldMessage = 'Cambo obrigatório'
    private readonly phoneInvalidMessage =
        'Digite um telefone válido (99) 99999-9999'
    private readonly passwordUnmatchedMessage = 'As senhas não coincidem'

    patterns: FieldPatternMap<OngRegisterFormFields> = {
        user: commonsPatternCNPJ,
        phone: commonsPatternPhone,
    }

    schema = yup
        .object({
            avatarBase64: yup.string().required(this.missingFieldMessage),
            name: yup.string().required(this.missingFieldMessage),
            user: yup
                .string()
                .required(this.onUserNotFulfilled)
                .matches(<RegExp>this.patterns?.user?.matcher, {
                    message: this.onUserPatternUnmatched,
                }),
            email: yup
                .string()
                .email(this.invalidEmailMessage)
                .required(this.missingFieldMessage),
            state: yup.string().required(this.missingFieldMessage),
            city: yup.string().required(this.missingFieldMessage),
            phone: yup
                .string()
                .matches(<RegExp>this.patterns.phone?.matcher, {
                    message: this.phoneInvalidMessage,
                })
                .required(this.missingFieldMessage),
            programsAndActivities: yup
                .string()
                .required(this.missingFieldMessage),
            mission: yup.string().required(this.missingFieldMessage),
            foundationDate: yup.string().required(this.missingFieldMessage),
            password: yup.string().required(this.missingFieldMessage),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref('password')], this.passwordUnmatchedMessage)
                .required(this.missingFieldMessage),
        })
        .required()
}
