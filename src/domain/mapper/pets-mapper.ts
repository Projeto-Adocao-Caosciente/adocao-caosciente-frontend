import { Mapper } from './mapper'
import { AnimalsResponse } from '../../data/model/animals-response'
import { AnimalModel } from '../models/animal-model'

export interface PetsMapper extends Mapper<AnimalsResponse, AnimalModel[]> {}

export class PetsMapperImpl implements PetsMapper {
    map(response?: AnimalsResponse): AnimalModel[] {
        return (response ?? []).map((animalResponse) => {
            return {
                id: animalResponse.id,
                name: animalResponse.name,
                type: animalResponse.type,
                breed: animalResponse.breed,
                height: animalResponse.height,
                weight: animalResponse.weight,
                special_needs: animalResponse.special_needs,
                adoption_requirements: animalResponse.adoption_requirements,
                photo: animalResponse.photo,
                aditionalInfo: animalResponse.aditional_info ?? '',
                adopter: animalResponse.adopter,
            }
        })
    }
}
