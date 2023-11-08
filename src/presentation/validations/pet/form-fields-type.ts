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
    private readonly missingFieldMessage = 'Cambo obrigatório'

    patterns: FieldPatternMap<PetFormFields> = {
        breed: commonsPatternAlphabetic,
        kind: commonsPatternAlphabetic,
        weight: commonsPatternNumeric,
        height: commonsPatternNumeric,
    }

    schema = yup
        .object({
            name: yup.string().required(this.missingFieldMessage),
            photoBase64: yup.string().required(this.missingFieldMessage),
            breed: yup.string().required(this.missingFieldMessage),
            kind: yup.string().required(this.missingFieldMessage),
            height: yup.string().required(this.missingFieldMessage),
            weight: yup.string().required(this.missingFieldMessage),
            specialNeeds: yup.lazy((val) =>
                Array.isArray(val) ? yup.array().of(yup.string()) : yup.string()
            ),
            additionalInformation: yup.string(),
        })
        .required()
}
