import { AdopterFormFields } from '../../presentation/validations/adopter/form-fields-type'
import { AdopterService } from '../../data/services/adopter-service'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { FieldConflict } from '../exceptions/field-conflict-error'
import { AdopterProfileFormFields } from '../../presentation/validations/adopter/profile-form-fields-type'

export interface AdopterInteractor {
    register: (fields: AdopterFormFields) => Promise<void>
    edit: (fields: AdopterProfileFormFields) => Promise<void>
}

export class AdopterInteractorImpl implements AdopterInteractor {
    constructor(private readonly service: AdopterService) {}

    async edit(fields: AdopterProfileFormFields): Promise<void> {
        const httpResponse = await this.service.edit(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return
            case HttpStatusCode.conflict:
                throw new FieldConflict(
                    httpResponse.body?.data?.field?.value ?? ''
                )
            default:
                throw new UnexpectedError()
        }
    }
    async register(fields: AdopterFormFields): Promise<void> {
        const httpResponse = await this.service.register(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            case HttpStatusCode.ok:
                return
            case HttpStatusCode.conflict:
                throw new FieldConflict(
                    httpResponse.body?.data?.field?.value ?? ''
                )
            default:
                throw new UnexpectedError()
        }
    }
}
