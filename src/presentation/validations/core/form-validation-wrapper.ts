import { Maybe, AnyObject, ObjectSchema } from 'yup'
import { FieldPatternMap } from './field-pattern-map'

export interface FieldsValidationWrapper<Fields extends Maybe<AnyObject>> {
    schema: ObjectSchema<Fields>
    patterns: FieldPatternMap<Fields>
}
