import { Mapper } from './mapper'
import { AnimalFormModel } from '../models/animal-form-model'
import { FormResponse } from '../../data/model/form-response'

export interface AnimalFormMapper
    extends Mapper<FormResponse, AnimalFormModel> {}

export class AnimalFormMapperImpl implements AnimalFormMapper {
    map(response?: FormResponse): AnimalFormModel {
        return {
            title: response?.title ?? 'Formulário de adoção',
            questions: (response?.questions ?? []).map((question) => {
                return {
                    title: question.question,
                    options: (question.choices ?? []).map((option) => {
                        return {
                            isCorrect: option.is_correct,
                            label: option.label,
                        }
                    }),
                }
            }),
        }
    }
}
