import { Mapper } from './mapper'
import { AnimalModel } from '../../presentation/models/animal-model'
import { AnimalResponse } from '../../data/model/animal-response'

export interface PetMapper extends Mapper<AnimalResponse, AnimalModel> {}

export class PetMapperImpl implements PetMapper {
    map(response?: AnimalResponse): AnimalModel {
        return {
            id: response?.id ?? '',
            name: response?.name ?? '',
            type: response?.type ?? '',
            breed: response?.breed ?? '',
            height: response?.height ?? '',
            weight: response?.weight ?? '',
            special_needs: response?.special_needs ?? [],
            adoption_requirements: response?.adoption_requirements ?? [],
            photo: response?.photo ?? '',
            adopter: response?.adopter ?? '',
        }
    }
}
