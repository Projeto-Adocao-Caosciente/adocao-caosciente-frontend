export class PetNotFoundError extends Error {
    constructor() {
        super('Não foi possível encontrar esse pet')
        this.name = 'PetNotFoundError'
    }
}
