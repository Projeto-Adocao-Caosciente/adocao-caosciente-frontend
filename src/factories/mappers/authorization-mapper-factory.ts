import {
    AuthorizationMapper,
    AuthorizationMapperImpl,
} from '../../domain/mapper/ong-mapper'

export const makeAuthorizationMapper = (): AuthorizationMapper =>
    new AuthorizationMapperImpl()
