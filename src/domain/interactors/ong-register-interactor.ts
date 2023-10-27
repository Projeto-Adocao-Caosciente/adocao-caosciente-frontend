import { OngService } from '../../data/services/ong-register-service'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { OngRegisterFormFields } from '../../presentation/validations/ong/form-fields-type'

export interface OngRegisterInteractor {
    register: (fields: OngRegisterFormFields) => Promise<void>
}

export class OngRegisterInteractorImpl implements OngRegisterInteractor {
    constructor(private readonly service: OngService) {}

    async register(fields: OngRegisterFormFields): Promise<void> {
        const httpResponse = await this.service.register(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }
}
