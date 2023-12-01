export interface FieldConflictResponse {
    field: KeyValueConflict
}

export interface KeyValueConflict {
    key: string
    value: string
}