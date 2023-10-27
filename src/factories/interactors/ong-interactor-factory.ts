import {
    OngRegisterInteractor,
    OngRegisterInteractorImpl,
} from '../../domain/interactors/ong-register-interactor'
import { makeOngService } from '../services/ong-register-service-factory'

export const makeOngRegisterInteractor = (): OngRegisterInteractor =>
    new OngRegisterInteractorImpl(makeOngService())
