export interface QuestionModel {
    id : string
    title: string
    isRequired: boolean
    questionType: string
    // TODO: Rever isso depois, talvez não seja necessário Union Type
    // correctQuestionOptionId: number | null
    options: QuestionOptionModel[]
}

export interface QuestionOptionModel {
    id : string
    label: string
    isCorrect: boolean
}