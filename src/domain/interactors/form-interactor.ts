import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { FormService } from '../../data/services/form-service'
import { QuestionFieldsValue } from '../models/question-field-model'
import { AnimalFormListModel } from '../models/animal-form-list-model'
import { AnimalFormListMapper } from '../mapper/animal-form-list-mapper'

export interface FormInteractor {
    saveForm: (
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ) => Promise<void>
    getForm: (formId: string) => Promise<any>
    getAnimalForms: (animalId: string) => Promise<AnimalFormListModel>
}

export class FormInteractorImpl implements FormInteractor {
    constructor(
        private readonly service: FormService,
        private readonly animalFormListMapper: AnimalFormListMapper
    ) {}

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

    async getAnimalForms(animalId: string): Promise<AnimalFormListModel> {
        const httpResponse = await this.service.getAnimalForms(animalId)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.animalFormListMapper.map(httpResponse.body?.data)
            default:
                throw new UnexpectedError()
        }
    }

    async getForm(formId: string): Promise<any> {
        throw new Error('Method not implemented.')
    }
}
