import { QuestionModel } from './question-model'

export interface FormModel {
    id : number
    formTitle: string
    questions: QuestionModel[]
}