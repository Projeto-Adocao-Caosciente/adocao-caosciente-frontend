import { makeAxiosHttpClient } from '../http/http-client-factory'
import { AdopterService, AdopterServiceImpl } from '../../data/services/adopter-service'

export const makeAdopterService = (): AdopterService =>
    new AdopterServiceImpl(makeAxiosHttpClient())
