export interface QuestionOptionField {
    id: string
    label: string
    isCorrect: boolean
}

export interface QuestionFieldsValue {
    id: string
    title: string
    isValid: boolean
    options: QuestionOptionField[]
}
