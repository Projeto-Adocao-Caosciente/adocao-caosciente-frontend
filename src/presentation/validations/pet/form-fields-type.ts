import * as yup from 'yup'
import { FieldPatternMap } from '../core/field-pattern-map'
import { FieldsValidationWrapper } from '../core/form-validation-wrapper'
import {
    commonsPatternAlphabetic,
    commonsPatternNumeric,
} from '../core/commons-patterns'

export type PetFormFields = {
    name: string
    photoBase64: string
    breed: string
    kind: string
    height: string
    weight: string
    specialNeeds?: string | (string | undefined)[] | undefined
    additionalInformation?: string
}

export interface PetFieldsValidationWrapper
    extends FieldsValidationWrapper<PetFormFields> {}

export class PetFieldsValidationWrapperImpl
    implements PetFieldsValidationWrapper
{

    
    private readonly minLengthInvalidMessage = (field: string, length: string) =>  `O campo ${field} deve ter no mínimo ${length} caracteres`;
    private readonly maxLengthInvalidMessage = (field: string, length: string) =>  `O campo ${field} deve ter no máximo ${length} caracteres`;

    private readonly missingFieldMessage = 'Cambo obrigatório'

    patterns: FieldPatternMap<PetFormFields> = {
        breed: commonsPatternAlphabetic,
        kind: commonsPatternAlphabetic,
        weight: commonsPatternNumeric,
        height: commonsPatternNumeric,
    }

    schema = yup
        .object({
            name: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('nome', '2'))
                .max(60, this.maxLengthInvalidMessage('nome', '60')),
            photoBase64: yup
                .string()
                .required(this.missingFieldMessage),
            breed: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('raça', '2'))
                .max(60, this.maxLengthInvalidMessage('raça', '60')),
            kind: yup
                .string()
                .required(this.missingFieldMessage)
                .min(2, this.minLengthInvalidMessage('espécie', '2'))
                .max(60, this.maxLengthInvalidMessage('espécie', '60')),
            height: yup
                .string()
                .required(this.missingFieldMessage),
            weight: yup
                .string()
                .required(this.missingFieldMessage),
            specialNeeds: yup.lazy((val) =>
                Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
            ),
            additionalInformation: yup
                .string()
                .max(500, this.maxLengthInvalidMessage('informações adicionais', '500')),
        })
        .required()
}
