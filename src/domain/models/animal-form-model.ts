export interface AnimalFormModel {
    title: string
    questions: AnimalFormQuestionModel[]
}

export interface AnimalFormQuestionModel {
    title: string
    options: AnimalFormQuestionOptionModel[]
}

export interface AnimalFormQuestionOptionModel {
    isCorrect: boolean
    label: string
}
