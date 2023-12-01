import {
    AuthInteractor,
    AuthInteractorImpl,
} from '../../domain/interactors/auth-interactor'
import { makeAuthService } from '../services/authenticator-service-factory'
import { makeAuthorizationMapper } from '../mappers/authorization-mapper-factory'
import { makeProfileMapper } from '../mappers/profile-mapper'

export const makeAuthenticator = (): AuthInteractor =>
    new AuthInteractorImpl(
        makeAuthService(),
        makeAuthorizationMapper(),
        makeProfileMapper()
    )
