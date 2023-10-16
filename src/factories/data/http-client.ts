import { AxiosHttpClient, AxiosHttpClientImpl } from '@/data/http';

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClientImpl()