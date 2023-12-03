import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { FormService } from '../../data/services/form-service'
import { QuestionFieldsValue } from '../models/question-field-model'

export interface FormInteractor {
    saveForm: (
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ) => Promise<void>
    getForm: (formId: string) => Promise<any>
}

export class FormInteractorImpl implements FormInteractor {
    constructor(private readonly service: FormService) {}

    async saveForm(
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ): Promise<void> {
        const httpResponse = await this.service.saveForm(
            formQuestions,
            formTitle,
            animalId
        )

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async getForm(formId: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
}
