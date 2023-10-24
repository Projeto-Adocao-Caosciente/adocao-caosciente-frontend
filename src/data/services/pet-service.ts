import { SelectOptionResponse } from '../model/select-option-response'

export interface PetService {
    getSpecialNeeds: () => Promise<SelectOptionResponse[]>
}

export class PetServiceImpl implements PetService {
    // TODO: consumir via backend
    getSpecialNeeds(): Promise<SelectOptionResponse[]> {
        return Promise.resolve([
            {
                name: 'Cegueira',
                value: 'cegueira',
            },
            {
                name: 'Surdez',
                value: 'surdez',
            },
        ])
    }
}
