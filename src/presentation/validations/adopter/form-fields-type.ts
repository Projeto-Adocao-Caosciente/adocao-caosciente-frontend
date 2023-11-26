import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import {
    commonsPatternCNPJ, commonsPatternITR,
    commonsPatternPhone, commonsPatternZipCode,
} from '../core/commons-patterns'
import { AnyObject, StringSchema } from 'yup'

type PartialSchemaField = StringSchema<
    string | undefined,
    AnyObject,
    undefined,
    ''
>

export type AdopterFormFields = {
    name: string
    itr: string
    birthdate: string
    gender: string
    email: string
    phone: string
    address: string
    zipCode: string
    city: string
    state: string
    password?: string
    passwordConfirmation?: string
}

export interface AdopterFieldsValidationWrapper
    extends FieldsValidationWrapper<AdopterFormFields> {
}

export class AdopterFieldsValidationWrapperImpl
    implements AdopterFieldsValidationWrapper {
    protected readonly onUserNotFulfilled: string = 'Campo obrigatório'

    private readonly onFieldPatternUnmatched: string =
        'O campo deve ser preenchido corretamente'

    private readonly invalidEmailMessage = 'Digite um email válido'
    private readonly missingFieldMessage = 'Cambo obrigatório'
    private readonly passwordUnmatchedMessage = 'As senhas não coincidem'

    patterns: FieldPatternMap<AdopterFormFields> = {
        itr: commonsPatternITR,
        phone: commonsPatternPhone,
        zipCode: commonsPatternZipCode,
    }

    schema = yup
        .object({
            name: yup.string().required(this.missingFieldMessage),
            itr: yup.string().required(this.missingFieldMessage).matches(<RegExp>this.patterns?.itr?.matcher, {
                message: this.onFieldPatternUnmatched,
            }),
            birthdate: yup.string().required(this.missingFieldMessage),
            gender: yup.string().required(this.missingFieldMessage),
            email: yup.string().required(this.missingFieldMessage).email(this.invalidEmailMessage),
            phone: yup.string().required(this.missingFieldMessage),
            address: yup.string().required(this.missingFieldMessage),
            zipCode: yup.string().required(this.missingFieldMessage).matches(<RegExp>this.patterns?.zipCode?.matcher, {
                message: this.onFieldPatternUnmatched,
            }),
            city: yup.string().required(this.missingFieldMessage),
            state: yup.string().required(this.missingFieldMessage),
            password: this.getPasswordValidation(),
            passwordConfirmation: this.getPasswordConfirmationValidation(),
        })
        .required()

    protected getPasswordValidation(): PartialSchemaField {
        return yup.string().required(this.missingFieldMessage)
    }

    protected getPasswordConfirmationValidation(): PartialSchemaField {
        return yup
            .string()
            .oneOf([yup.ref('password')], this.passwordUnmatchedMessage)
            .required(this.missingFieldMessage)
    }
}
