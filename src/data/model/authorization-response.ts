export type AuthorizationResponse<T> = {
    access_token: string
    user: T
}
