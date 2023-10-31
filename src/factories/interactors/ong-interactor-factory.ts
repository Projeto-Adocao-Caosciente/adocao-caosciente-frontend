import {
    OngInteractor,
    OngInteractorImpl,
} from '../../domain/interactors/ong-interactor'
import { makeOngService } from '../services/ong-register-service-factory'
import { makeAuthorizationMapper } from '../mappers/authorization-mapper-factory'

export const makeOngInteractor = (): OngInteractor =>
    new OngInteractorImpl(makeOngService(), makeAuthorizationMapper())
