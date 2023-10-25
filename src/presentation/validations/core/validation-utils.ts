import { FieldErrors, FieldValues } from 'react-hook-form'

export const isFieldValid = <T extends FieldValues>(
    errors: FieldErrors<T>,
    field: keyof FieldErrors<T>
): boolean => errors[field]?.message != null
