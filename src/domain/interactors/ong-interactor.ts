import { OngService } from '../../data/services/ong-register-service'
import { HttpResponse, HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { OngFormFields } from '../../presentation/validations/ong/form-fields-type'
import { LoginFormFields } from '../../presentation/validations/login/form-fields-type'
import { Authorization } from '../models/authorization'
import { AuthorizationMapper } from '../mapper/ong-mapper'
import { AuthorizationResponse } from '../../data/model/authorization-response'
import { OngModel } from '../../presentation/models/ong-model'

export interface OngInteractor {
    register: (fields: OngFormFields) => Promise<void>
    login: (fields: LoginFormFields) => Promise<Authorization<OngModel>>
}

export class OngInteractorImpl implements OngInteractor {
    constructor(
        private readonly service: OngService,
        private readonly mapper: AuthorizationMapper
    ) {}

    async register(fields: OngFormFields): Promise<void> {
        const httpResponse = await this.service.register(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.created:
                return
            default:
                throw new UnexpectedError()
        }
    }

    async login(fields: LoginFormFields): Promise<Authorization<OngModel>> {
        const httpResponse = await this.service.login(fields)

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return this.onHttpStatusCodeOk(httpResponse)
            default:
                throw new UnexpectedError()
        }
    }

    private onHttpStatusCodeOk(
        httpResponse: HttpResponse<AuthorizationResponse<OngModel>>
    ): Authorization<OngModel> {
        const authorization = this.mapper.map(httpResponse.body)
        if (authorization != null) {
            return {
                accessToken: authorization.accessToken!,
                user: authorization.user!,
            }
        } else {
            throw new UnexpectedError()
        }
    }
}
