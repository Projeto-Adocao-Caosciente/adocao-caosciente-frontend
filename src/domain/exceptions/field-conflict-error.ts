export class FieldConflict extends Error {
    constructor(key: string) {
        super('Não foi possível realizar a operação desejada. O ' + key + ' informado já está cadastrado.')
        this.name = 'FieldConflict'
    }
}
