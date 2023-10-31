export interface Mapper<T, O> {
    map: (t?: T) => O
}
