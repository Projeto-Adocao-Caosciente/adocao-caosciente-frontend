export class InvalidProfileTypeError extends Error {
    constructor() {
        super('Tipo de perfil inválido')
        this.name = 'InvalidProfileTypeError'
    }
}
