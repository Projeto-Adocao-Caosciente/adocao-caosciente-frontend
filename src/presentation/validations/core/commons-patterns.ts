import { FieldPatternValue } from './field-pattern-map'

export const commonsPatternCNPJ: FieldPatternValue = {
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
}

export const commonsPatternPhone: FieldPatternValue = {
    // Regex for Phone - (00) 00000-0000
    matcher: /^\(\d{2}\) \d{5}-\d{4}$/,
    apply: (value) => {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    },
}
