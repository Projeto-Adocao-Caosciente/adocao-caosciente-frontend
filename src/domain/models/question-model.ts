export interface QuestionModel {
    id : number
    title: string
    options: QuestionOptionModel[]
}

export interface QuestionOptionModel {
    id : number
    option: string
    correct: boolean
}