import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { FormResponse } from '../model/form-response'
import {
    QuestionFieldsValue,
    QuestionOptionField,
} from '../../domain/models/question-field-model'

export interface FormService {
    saveForm: (
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ) => Promise<HttpResponse<void>>
    getForm: (id: string) => Promise<HttpResponse<FormResponse>>
}

export class FormServiceImpl implements FormService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly savePath = (animalId: string) =>
        `/ong/animals/${animalId}/forms`
    private readonly getPath = '/form'

    saveForm(
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ): Promise<HttpResponse<void>> {
        const formParsed = {
            title: formTitle,
            questions: formQuestions.map((question: QuestionFieldsValue) => {
                return {
                    question: question.title,
                    choices: question.options.map(
                        (option: QuestionOptionField, index) => {
                            return {
                                id: index,
                                label: option.label,
                                is_correct: option.isCorrect,
                            }
                        }
                    ),
                }
            }),
        }
        return this.httpClient.request({
            path: this.savePath(animalId),
            method: 'post',
            body: formParsed,
        })
    }
    getForm(id: string): Promise<HttpResponse<FormResponse>> {
        throw new Error('Method not implemented.')
    }
}
