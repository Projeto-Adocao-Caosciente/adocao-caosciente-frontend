import { UserBaseModel } from './user-base-model'

export interface AdopterModel extends UserBaseModel {
    address: string
    number: string
    zipCode: string
    birthdate: string
    gender: string
}
