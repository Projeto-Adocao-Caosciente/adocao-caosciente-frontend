import { Mapper } from './mapper'
import { Authorization } from '../models/authorization'
import { AuthorizationResponse } from '../../data/model/authorization-response'

export interface AuthorizationMapper
    extends Mapper<Partial<AuthorizationResponse>, Authorization> {}

export class AuthorizationMapperImpl implements AuthorizationMapper {
    map(
        authorizationResponse: Partial<AuthorizationResponse> | undefined
    ): Authorization {
        return {
            accessToken: authorizationResponse?.access_token ?? '',
        }
    }
}
