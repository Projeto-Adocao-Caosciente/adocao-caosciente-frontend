export class InvalidCredentialsError extends Error {
    constructor() {
        super('Credenciais inválidas, usuário ou senha incorretos')
        this.name = 'InvalidCredentialsError'
    }
}
