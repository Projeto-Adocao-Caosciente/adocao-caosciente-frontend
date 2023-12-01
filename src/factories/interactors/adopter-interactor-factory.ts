import { AdopterInteractor, AdopterInteractorImpl } from '../../domain/interactors/adopter-interactor'
import { makeAdopterService } from '../services/adopter-service-factory'

export const makeAdopterInteractor = (): AdopterInteractor =>
    new AdopterInteractorImpl(makeAdopterService())
