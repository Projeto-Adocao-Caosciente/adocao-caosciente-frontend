import {
    AxiosHttpClient,
    AxiosHttpClientImpl,
} from '../../data/http/http-client'
import { makeApiUrl } from './api-url-factory'
import { makeAxiosHttpClientConfig } from './axios-config-factory'

export const makeAxiosHttpClient = (): AxiosHttpClient =>
    new AxiosHttpClientImpl(makeApiUrl(), makeAxiosHttpClientConfig())
