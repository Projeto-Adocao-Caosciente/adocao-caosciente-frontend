import { PetService, PetServiceImpl } from '../../data/services/pet-service'
import { makeAxiosHttpClient } from '../http/http-client-factory'

export const makePetService = (): PetService =>
    new PetServiceImpl(makeAxiosHttpClient())
