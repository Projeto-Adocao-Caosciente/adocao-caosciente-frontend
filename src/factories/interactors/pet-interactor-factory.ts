import {
    PetInteractor,
    PetInteractorImpl,
} from '../../domain/interactors/pet-interactor'
import { makePetService } from '../services/pet-service-factory'
import { makePetMapper } from '../mappers/pet-mapper-factory'
import { makePetsMapper } from '../mappers/pets-mapper-factory'

export const makePetInteractor = (): PetInteractor =>
    new PetInteractorImpl(makePetService(), makePetMapper(), makePetsMapper())
