export interface QuestionModel {
    id: string
    title: string
    options: QuestionOptionModel[]
}

export interface QuestionOptionModel {
    id: string
    label: string
    isCorrect: boolean
}
