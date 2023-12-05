export class PetInvalidFoundError extends Error {
    constructor() {
        super('Não foi possível encontrar o Pet desejado. Por favor, tente novamente mais tarde.')
        this.name = 'PetInvalidFoundError'
    }
}
