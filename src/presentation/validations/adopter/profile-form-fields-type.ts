import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import {
    commonsPatternITR,
    commonsPatternPhone,
    commonsPatternZipCode,
} from '../core/commons-patterns'

export type AdopterProfileFormFields = {
    name?: string
    itr?: string
    birthdate?: string
    gender?: string
    email?: string
    phone?: string
    address?: string
    zipCode?: string
    city?: string
    state?: string
}

export interface AdopterProfileFieldsValidationWrapper
    extends FieldsValidationWrapper<AdopterProfileFormFields> {}

export class AdopterProfileFieldsValidationWrapperImpl
    implements AdopterProfileFieldsValidationWrapper
{
    private readonly onFieldPatternUnmatched: string =
        'O campo deve ser preenchido corretamente'

    private readonly minLengthInvalidMessage = (
        field: string,
        length: string
    ) => `O campo ${field} deve ter no mínimo ${length} caracteres`
    private readonly maxLengthInvalidMessage = (
        field: string,
        length: string
    ) => `O campo ${field} deve ter no máximo ${length} caracteres`

    private readonly phoneInvalidMessage =
        'Digite um telefone válido (99) 99999-9999'
    private readonly invalidEmailMessage = 'Digite um email válido'

    patterns: FieldPatternMap<AdopterProfileFormFields> = {
        itr: commonsPatternITR,
        phone: commonsPatternPhone,
        zipCode: commonsPatternZipCode,
    }

    schema = yup
        .object({
            name: yup
                .string()
                .min(2, this.minLengthInvalidMessage('nome', '2'))
                .max(60, this.maxLengthInvalidMessage('nome', '60')),
            itr: yup.string().matches(<RegExp>this.patterns?.itr?.matcher, {
                message: this.onFieldPatternUnmatched,
            }),
            birthdate: yup
                .string()
                .matches(<RegExp>this.patterns?.birthdate?.matcher, {
                    message: this.onFieldPatternUnmatched,
                }),
            gender: yup.string(),
            email: yup
                .string()
                .email(this.invalidEmailMessage)
                .max(60, this.maxLengthInvalidMessage('email', '60')),
            phone: yup.string().matches(<RegExp>this.patterns.phone?.matcher, {
                message: this.phoneInvalidMessage,
            }),
            address: yup.string().when('_', (_, __, node) => {
                if (node.value.length > 0) {
                    return yup
                        .string()
                        .min(2, this.minLengthInvalidMessage('endereço', '2'))
                        .max(60, this.maxLengthInvalidMessage('endereço', '60'))
                }

                return yup.string()
            }),
            zipCode: yup.string().when('_', (_, __, node) => {
                if (node.value.length > 0) {
                    return yup
                        .string()
                        .matches(<RegExp>this.patterns?.zipCode?.matcher, {
                            message: this.onFieldPatternUnmatched,
                        })
                }

                return yup.string()
            }),
            city: yup.string().when('_', (_, __, node) => {
                if (node.value.length > 0) {
                    return yup
                        .string()
                        .min(2, this.minLengthInvalidMessage('cidade', '2'))
                        .max(60, this.maxLengthInvalidMessage('cidade', '60'))
                }

                return yup.string()
            }),
            state: yup.string().when('_', (_, __, node) => {
                if (node.value.length > 0) {
                    return yup
                        .string()
                        .min(2, this.minLengthInvalidMessage('estado', '2'))
                        .max(60, this.maxLengthInvalidMessage('estado', '60'))
                }
                return yup.string()
            }),
        })
        .required()
}
