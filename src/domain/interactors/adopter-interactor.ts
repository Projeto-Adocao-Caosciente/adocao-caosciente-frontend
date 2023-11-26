import { Authorization } from '../models/authorization'
import { AdopterFormFields } from '../../presentation/validations/adopter/form-fields-type'
import { AdopterService } from '../../data/services/adopter-service'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'

export interface AdopterInteractor {
    register: (fields: AdopterFormFields) => Promise<void>
    edit: (fields: AdopterFormFields) => Promise<void>
    login: (fields: any) => Promise<Authorization<any>>
}

export class AdopterInteractorImpl implements AdopterInteractor {

    constructor(
        private readonly service: AdopterService,
    ) {
    }

    edit(fields: AdopterFormFields): Promise<void> {
        throw new Error('unimplemented method: AdopterInteractorImpl.edit')
    }

    login(fields: any): Promise<Authorization<any>> {
        throw new Error('unimplemented method: AdopterInteractorImpl.login')
    }

    async register(fields: AdopterFormFields): Promise<void> {
        const httpResponse = await this.service.register(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            case HttpStatusCode.ok:
                return
            default:
                throw new UnexpectedError()
        }
    }
}