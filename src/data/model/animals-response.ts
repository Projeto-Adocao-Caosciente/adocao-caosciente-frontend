import { AnimalResponse } from './animal-response'

export interface AnimalsResponse {
    message?: string
    data: AnimalsDataResponse
}

export interface AnimalsDataResponse {
    animals: AnimalResponse[]
}
