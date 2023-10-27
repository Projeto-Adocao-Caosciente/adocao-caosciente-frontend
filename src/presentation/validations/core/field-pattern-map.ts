export type FieldPatternValue = {
    matcher: RegExp | undefined
    apply: (value: string) => string
}

export type FieldPatternMap<T> = {
    [K in keyof T]?: FieldPatternValue | undefined
}
