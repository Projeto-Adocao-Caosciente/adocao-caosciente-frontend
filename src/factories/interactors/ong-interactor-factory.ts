import {
    OngInteractor,
    OngInteractorImpl,
} from '../../domain/interactors/ong-interactor'
import { makeOngService } from '../services/ong-register-service-factory'

export const makeOngInteractor = (): OngInteractor =>
    new OngInteractorImpl(makeOngService())
