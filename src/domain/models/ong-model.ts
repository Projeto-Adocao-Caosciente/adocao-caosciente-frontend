import { UserBaseModel } from './user-base-model'

export interface OngModel extends UserBaseModel {
    mission: string
    foundation: string
    description: string
}
