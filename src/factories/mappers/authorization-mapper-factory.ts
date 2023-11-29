import {
    AuthorizationMapper,
    AuthorizationMapperImpl,
} from '../../domain/mapper/authorization-mapper'

export const makeAuthorizationMapper = (): AuthorizationMapper =>
    new AuthorizationMapperImpl()
