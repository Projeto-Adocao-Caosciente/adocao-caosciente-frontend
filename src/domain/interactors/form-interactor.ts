import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { FormService } from '../../data/services/form-service'
import { QuestionFieldsValue } from '../models/question-field-model'
import { AnimalFormListModel } from '../models/animal-form-list-model'
import { AnimalFormListMapper } from '../mapper/animal-form-list-mapper'
import { AnimalFormMapper } from '../mapper/animal-form-mapper'
import { AnimalFormModel } from '../models/animal-form-model'

export interface FormInteractor {
    saveForm: (
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ) => Promise<string>
    getForm: (formId: string) => Promise<AnimalFormModel>
    getAnimalForms: (animalId: string) => Promise<AnimalFormListModel>
    sendFormToAdopters: (args: {
        formId: string
        emails: string[]
    }) => Promise<void>
}

export class FormInteractorImpl implements FormInteractor {
    constructor(
        private readonly service: FormService,
        private readonly animalFormListMapper: AnimalFormListMapper,
        private readonly animalFormMapper: AnimalFormMapper
    ) {}

    async saveForm(
        formQuestions: QuestionFieldsValue[],
        formTitle: string,
        animalId: string
    ): Promise<string> {
        const httpResponse = await this.service.saveForm(
            formQuestions,
            formTitle,
            animalId
        )

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                const id = httpResponse.body?.data?.id

                if (id == null) {
                    throw new UnexpectedError()
                }

                return id
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

    async getForm(formId: string): Promise<AnimalFormModel> {
        const httpResponse = await this.service.getForm(formId)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.animalFormMapper.map(httpResponse.body?.data)
            default:
                throw new UnexpectedError()
        }
    }

    async sendFormToAdopters(args: {
        formId: string
        emails: string[]
    }): Promise<void> {
        const httpResponse = await this.service.sendFormToAdopters(
            args.formId,
            args.emails
        )

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return
            default:
                throw new UnexpectedError()
        }
    }
}
