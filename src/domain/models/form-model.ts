import { QuestionModel } from './question-model'

export interface FormModel {
    formTitle: string
    questions: QuestionModel[]
}