import {
    OngService,
    OngServiceImpl,
} from '../../data/services/ong-register-service'
import { makeAxiosHttpClient } from '../http/http-client-factory'

export const makeOngService = (): OngService =>
    new OngServiceImpl(makeAxiosHttpClient())
