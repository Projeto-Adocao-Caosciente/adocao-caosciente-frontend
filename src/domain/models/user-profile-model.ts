import { OngModel } from './ong-model'
import { AdopterModel } from './adopter-model'

export enum UserType {
    ngo = 1,
    adopter,
}

export type UserProfileModel = {
    type: UserType
    data: OngModel | AdopterModel
}
