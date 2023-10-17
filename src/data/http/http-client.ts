import axios, { AxiosResponse, Method } from 'axios/index'

export type HttpRequest = {
  url: string
  method: Method
  body?: any
  headers?: any
}

export enum HttpStatusCode {
  ok = 200,
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

export class AxiosHttpClientImpl implements AxiosHttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    axiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
    })

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
