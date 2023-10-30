import {
    AxiosHttpClient,
    AxiosHttpClientImpl,
} from '../../data/http/http-client'
import { makeApiUrl } from './api-url-factory'
import { makeAxiosHttpClientConfig } from './axios-config-factory'
import axios from 'axios'
import { Cookies } from 'react-cookie'

const api = axios.create({
    baseURL: makeApiUrl(),
    ...makeAxiosHttpClientConfig(),
})

api.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${new Cookies().get('token')}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const makeAxiosHttpClient = (): AxiosHttpClient =>
    new AxiosHttpClientImpl(api)
