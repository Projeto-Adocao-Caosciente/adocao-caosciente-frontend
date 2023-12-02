import { FormModel } from "../models/form-model";
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error';
import { FormService } from "../../data/services/form-service";

export interface FormInteractor {
    saveForm: (form: FormModel, animal_id: string) => Promise<void>
    getForm: (id: string) => Promise<FormModel>
}

export class FormInteractorImpl implements FormInteractor {
    constructor(
        private readonly service: FormService,
        // private readonly formMapper: FormMapper
    ) {}

    async saveForm(form: FormModel, animal_id: string): Promise<void> {
        const httpResponse = await this.service.saveForm(form, animal_id)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async getForm(id: string): Promise<FormModel> {
        throw new Error("Method not implemented.");
        // if (id.length <= 0) throw new FormInvalidFoundError()

        // const httpResponse = await this.service.getForm(id)

        // switch (httpResponse.statusCode) {
        //     case HttpStatusCode.ok:
        //         return this.formMapper.map(httpResponse.body?.data)
        //     case HttpStatusCode.notFound:
        //         throw new FormNotFoundError()
        //     default:
        //         throw new UnexpectedError()
        // }
    }
}