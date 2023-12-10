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
    ) => Promise<HttpResponse<{ id: string }>>
    getAnimalForms: (
        animalId: string
    ) => Promise<HttpResponse<AnimalFormListResponse>>
    getForm: (id: string) => Promise<HttpResponse<FormResponse>>
    sendFormToAdopters: (
        formId: string,
        emails: string[]
    ) => Promise<HttpResponse<void>>
}

export class FormServiceImpl implements FormService {
    constructor(private readonly httpClient: AxiosHttpClient) {}

    private readonly basePath = (animalId: string) =>
        `/ong/animals/${animalId}/forms`

    private readonly getPath = (formId: string) => `ong/animals/forms/${formId}`
    private readonly sendEmailPath = 'email/send'

    saveForm(
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ): Promise<HttpResponse<{ id: string }>> {
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

    sendFormToAdopters(
        formId: string,
        emails: string[]
    ): Promise<HttpResponse<void>> {
        return this.httpClient.request({
            path: this.sendEmailPath,
            method: 'post',
            body: {
                form_id: formId,
                recipient_emails: emails,
            },
        })
    }
}
