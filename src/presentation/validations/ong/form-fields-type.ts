import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import {
    commonsPatternCNPJ,
    commonsPatternPhone,
} from '../core/commons-patterns'
import { AnyObject, StringSchema } from 'yup'

type PartialSchemaField = StringSchema<
    string | undefined,
    AnyObject,
    undefined,
    ''
>

export type OngFormFields = {
    avatarBase64: string
    name: string
    user: string
    email: string
    state: string
    city: string
    phone: string
    programsAndActivities?: string
    mission?: string
    foundationDate: string
    password?: string
    passwordConfirmation?: string
}

export interface OngFieldsValidationWrapper
    extends FieldsValidationWrapper<OngFormFields> {}

export class OngFieldsValidationWrapperImpl
    implements OngFieldsValidationWrapper
{
    protected readonly onUserNotFulfilled: string = 'Campo obrigatório'

    private readonly onUserPatternUnmatched: string =
        'O campo deve ser preenchido corretamente'

    private readonly minLengthInvalidMessage = (
        field: string,
        length: string
    ) => `O campo ${field} deve ter no mínimo ${length} caracteres`
    private readonly maxLengthInvalidMessage = (
        field: string,
        length: string
    ) => `O campo ${field} deve ter no máximo ${length} caracteres`

    private readonly invalidEmailMessage = 'Digite um email válido'
    private readonly missingFieldMessage = 'Cambo obrigatório'
    private readonly phoneInvalidMessage =
        'Digite um telefone válido (99) 99999-9999'
    private readonly passwordUnmatchedMessage = 'As senhas não coincidem'

    patterns: FieldPatternMap<OngFormFields> = {
        user: commonsPatternCNPJ,
        phone: commonsPatternPhone,
    }

    schema = yup
        .object({
            avatarBase64: yup.string().required(this.missingFieldMessage),
            name: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('nome', '2'))
                .max(60, this.maxLengthInvalidMessage('nome', '60')),
            user: yup
                .string()
                .required(this.onUserNotFulfilled)
                .matches(<RegExp>this.patterns?.user?.matcher, {
                    message: this.onUserPatternUnmatched,
                }),
            email: yup
                .string()
                .email(this.invalidEmailMessage)
                .required(this.missingFieldMessage)
                .max(60, this.maxLengthInvalidMessage('email', '60')),
            state: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('estado', '2'))
                .max(60, this.maxLengthInvalidMessage('estado', '60')),
            city: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('cidade', '2'))
                .max(60, this.maxLengthInvalidMessage('cidade', '60')),
            phone: yup
                .string()
                .matches(<RegExp>this.patterns.phone?.matcher, {
                    message: this.phoneInvalidMessage,
                })
                .required(this.missingFieldMessage),
            programsAndActivities: yup
                .string()
                .max(
                    500,
                    this.maxLengthInvalidMessage(
                        'programas e atividades',
                        '500'
                    )
                ),
            mission: yup
                .string()
                .max(500, this.maxLengthInvalidMessage('missão', '500')),
            foundationDate: yup.string().required(this.missingFieldMessage),
            password: this.getPasswordValidation(),
            passwordConfirmation: this.getPasswordConfirmationValidation(),
        })
        .required()

    protected getPasswordValidation(): PartialSchemaField {
        return yup
            .string()
            .required(this.missingFieldMessage)
            .min(4, this.minLengthInvalidMessage('senha', '4'))
            .max(60, this.maxLengthInvalidMessage('senha', '60'))
    }

    protected getPasswordConfirmationValidation(): PartialSchemaField {
        return yup
            .string()
            .required(this.missingFieldMessage)
            .min(4, this.minLengthInvalidMessage('confirmar senha', '4'))
            .max(60, this.maxLengthInvalidMessage('confirmar senha', '60'))
            .oneOf([yup.ref('password')], this.passwordUnmatchedMessage)
    }
}

export class OngEditFieldsValidationWrapperImpl extends OngFieldsValidationWrapperImpl {
    protected getPasswordValidation(): PartialSchemaField {
        return yup.string()
    }

    protected getPasswordConfirmationValidation(): PartialSchemaField {
        return yup.string()
    }
}
