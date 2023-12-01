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

export const commonsPatternCNPJITR: FieldPatternValue = {
    // Regex for CNPJ or ITR - 00.000.000/0000-00 / 000.000.000-00
    matcher: /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/,
    apply: (value) => {
        const itrMaskedValue = commonsPatternITR.apply(value)

        if (value.length < 14) {
            return itrMaskedValue
        }

        if (
            commonsPatternITR.matcher!.test(itrMaskedValue) &&
            value.length <= 14
        ) {
            return itrMaskedValue
        }

        return commonsPatternCNPJ.apply(value)
    },
}

export const commonsPatternITR: FieldPatternValue = {
    // Regex for ITR - 000.000.000-00
    matcher: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    apply: (value) =>
        value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
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

export const commonsPatternNumeric: FieldPatternValue = {
    // Regex that allows only '0,5 - 1,5 - 10,0' values
    matcher: /[^0-9,]/,
    apply: (value) => {
        return value.replace(/[^0-9,]|(,.*?,)/g, '')
    },
}

export const commonsPatternAlphabetic: FieldPatternValue = {
    matcher: /[^a-zA-Z,]/,
    apply: (value) => {
        return value.replace(/[^a-zA-Z,]/g, '')
    },
}

export const commonsPatternNumbersOnly: FieldPatternValue = {
    matcher: /[^0-9]/,
    apply: (value) => {
        return value.replace(/[^0-9]/g, '')
    },
}

export const commonsPatternZipCode: FieldPatternValue = {
    // Regex for ZipCode - 00000-000
    matcher: /^\d{5}-\d{3}$/,
    apply: (value) => {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    },
}
