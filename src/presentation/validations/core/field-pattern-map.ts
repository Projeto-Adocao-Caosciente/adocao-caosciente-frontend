export type FieldPatternMap<T> = {
    [K in keyof T]:
        | {
              matcher: RegExp | undefined
              apply: (value: string) => string
          }
        | undefined
}
