import { UserType } from './user-profile-model'

export interface UserBaseModel {
    type: UserType
    typeName: string
    document: string
    name: string
    phone: string
    state: string
    city: string
    email: string
    photo: string
}
