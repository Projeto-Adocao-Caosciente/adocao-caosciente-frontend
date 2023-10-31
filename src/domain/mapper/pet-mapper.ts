import { SelectOption } from '../models/select-option'
import { Mapper } from './mapper'
import { SelectOptionResponse } from '../../data/model/select-option-response'

export interface PetMapper
    extends Mapper<SelectOptionResponse[], SelectOption[]> {}

export class PetMapperImpl implements PetMapper {
    map(selectOptionsResponse?: SelectOptionResponse[]): SelectOption[] {
        return (
            selectOptionsResponse?.map((value) => {
                return {
                    label: value.name,
                    value: value.value,
                }
            }) ?? []
        )
    }
}
