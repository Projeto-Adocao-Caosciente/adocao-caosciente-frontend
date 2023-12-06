import { AxiosHttpClient, HttpResponse } from '../http/http-client'
import { FormResponse } from '../model/form-response'
import {
    QuestionFieldsValue,
    QuestionOptionField,
} from '../../domain/models/question-field-model'
import { AnimalFormListModel } from '../../domain/models/animal-form-list-model'
import { AnimalFormListResponse } from '../model/animal-form-list-response'

export interface FormService {
    saveForm: (
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ) => Promise<HttpResponse<void>>
    getAnimalForms: (
        animalId: string
    ) => Promise<HttpResponse<AnimalFormListResponse>>
    getForm: (id: string) => Promise<HttpResponse<FormResponse>>
}

export class FormServiceImpl implements FormService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly basePath = (animalId: string) =>
        `/ong/animals/${animalId}/forms`

    private readonly getPath = (formId: string) => `ong/animals/forms/${formId}`

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
            path: this.basePath(animalId),
            method: 'post',
            body: formParsed,
        })
    }

    getAnimalForms(
        animalId: string
    ): Promise<HttpResponse<AnimalFormListResponse>> {
        return this.httpClient.request({
            path: this.basePath(animalId),
            method: 'get',
        })
    }

    getForm(id: string): Promise<HttpResponse<FormResponse>> {
        return this.httpClient.request({
            path: this.getPath(id),
            method: 'get',
        })
    }
}
