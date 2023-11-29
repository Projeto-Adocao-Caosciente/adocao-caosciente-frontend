import { OngService } from '../../data/services/ong-register-service'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { OngFormFields } from '../../presentation/validations/ong/form-fields-type'

export interface OngInteractor {
    register: (fields: OngFormFields) => Promise<void>
    edit: (fields: OngFormFields) => Promise<void>
}

export class OngInteractorImpl implements OngInteractor {
    constructor(private readonly service: OngService) {}

    async edit(fields: OngFormFields): Promise<void> {
        const httpResponse = await this.service.edit(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async register(fields: OngFormFields): Promise<void> {
        const httpResponse = await this.service.register(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }
}
