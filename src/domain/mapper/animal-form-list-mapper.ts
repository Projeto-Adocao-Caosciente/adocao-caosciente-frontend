import { Mapper } from './mapper'
import { AnimalFormListModel } from '../models/animal-form-list-model'
import { AnimalFormListResponse } from '../../data/model/animal-form-list-response'

export interface AnimalFormListMapper
    extends Mapper<AnimalFormListResponse, AnimalFormListModel> {}

export class AnimalFormListMapperImpl implements AnimalFormListMapper {
    map(response?: AnimalFormListResponse): AnimalFormListModel {
        return (response ?? []).map((item) => {
            return {
                formId: item.id,
                formTitle: item.title,
            }
        })
    }
}
