export class PetInvalidFoundError extends Error {
    constructor() {
        super('Não foi possível encontrar esse pet')
        this.name = 'PetInvalidFoundError'
    }
}
