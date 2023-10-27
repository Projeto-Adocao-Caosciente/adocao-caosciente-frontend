import axios, { AxiosResponse, Method } from 'axios'
import { AxiosRequestConfig } from 'axios/index'

export type HttpRequest = {
    path: string
    method: Method
    body?: any
    headers?: any
}

export enum HttpStatusCode {
    ok = 200,
    created = 201,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500,
}

export type HttpResponse<T = any> = {
    statusCode: HttpStatusCode
    body?: T
}

export interface AxiosHttpClient<T = any> {
    request: (data: HttpRequest) => Promise<HttpResponse<T>>
}

export type AxiosHttpClientConfig = Pick<AxiosRequestConfig, 'timeout'>

export class AxiosHttpClientImpl implements AxiosHttpClient {
    constructor(
        private readonly baseurl: string,
        private readonly config: AxiosHttpClientConfig
    ) {}

    async request(data: HttpRequest): Promise<HttpResponse> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.request({
                url: `${this.baseurl}${data.path}`,
                method: data.method,
                data: data.body,
                headers: data.headers,
                ...this.config,
            })
        } catch (error: any) {
            axiosResponse = error.response
        }
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data,
        }
    }
}
