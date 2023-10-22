import { PetService, PetServiceImpl } from '../../data/services/pet-service'

export const makePetService = (): PetService => new PetServiceImpl()
