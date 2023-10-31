import { Mapper } from './mapper'
import { Authorization } from '../models/authorization'
import { AuthorizationResponse } from '../../data/model/authorization-response'
import { OngModel } from '../../presentation/models/ongModel'

export interface AuthorizationMapper
    extends Mapper<
        AuthorizationResponse<OngModel>,
        Partial<Authorization<OngModel>>
    > {}

export class AuthorizationMapperImpl implements AuthorizationMapper {
    map(
        authorizationResponse?: AuthorizationResponse<OngModel>
    ): Partial<Authorization<OngModel>> {
        return {
            accessToken: authorizationResponse?.access_token,
            user: authorizationResponse?.user,
        }
    }
}
