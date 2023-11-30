import { AxiosInstance, AxiosResponse, Method, AxiosRequestConfig } from 'axios'

export type HttpRequest = {
    path: string
    method: Method
    body?: any
    customHeaders?: AxiosRequestConfig['headers']
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
    body?: { data: T; message?: string }
}

export interface AxiosHttpClient {
    request: <T>(data: HttpRequest) => Promise<HttpResponse<T>>
}

export type AxiosHttpClientConfig = Pick<AxiosRequestConfig, 'timeout'>

export class AxiosHttpClientImpl implements AxiosHttpClient {
    constructor(private readonly api: AxiosInstance) {}

    async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
        let axiosResponse: AxiosResponse
        console.log('asdjasdjasjaskdjkasbdjkas ', data.customHeaders)
        try {
            axiosResponse = await this.api.request({
                url: data.path,
                method: data.method,
                data: data.body,
                headers: data.customHeaders,
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
