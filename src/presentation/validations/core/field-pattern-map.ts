export type FieldPatternMap<T> = {
    [K in keyof T]: RegExp | undefined
}
