import {
    FormInteractor,
    FormInteractorImpl,
} from '../../domain/interactors/form-interactor'
import { makeFormService } from '../services/form-service-factory'
import { makeAnimalFormListMapper } from '../mappers/animal-form-list-mapper-factory'
import { makeAnimalFormMapper } from '../mappers/animal-form-mapper-factory'

export const makeFormInteractor = (): FormInteractor =>
    new FormInteractorImpl(
        makeFormService(),
        makeAnimalFormListMapper(),
        makeAnimalFormMapper()
    )
