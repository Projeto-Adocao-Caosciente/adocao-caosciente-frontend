import { AxiosHttpClientConfig } from '../../data/http/http-client'

export const makeAxiosHttpClientConfig = (): AxiosHttpClientConfig => ({
    // 30000 in milliseconds = 30 seconds
    timeout: 30000,
})
