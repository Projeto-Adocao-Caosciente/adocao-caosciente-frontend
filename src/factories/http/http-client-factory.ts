import {
    AxiosHttpClient,
    AxiosHttpClientImpl,
} from '../../data/http/http-client'
import { makeApiUrl } from './api-url-factory'
import { makeAxiosHttpClientConfig } from './axios-config-factory'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { AUTHORIZATION_KEY, bearerBuilder } from '../../utils/build-bearer'

const api = axios.create({
    baseURL: makeApiUrl(),
    ...makeAxiosHttpClientConfig(),
})

api.interceptors.request.use(
    (config) => {
        const accessToken = new Cookies().get('token')
        if (accessToken) {
            config.headers[AUTHORIZATION_KEY] = bearerBuilder(accessToken)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const makeAxiosHttpClient = (): AxiosHttpClient =>
    new AxiosHttpClientImpl(api)
