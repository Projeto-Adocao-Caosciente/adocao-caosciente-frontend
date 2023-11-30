export const AUTHORIZATION_KEY = 'Authorization'
export const BEARER_KEY = 'Bearer'

export function bearerBuilder(accessToken: string) {
    console.log('asdjasdjasjaskdjkasbdjkas ', accessToken)
    return `banana ${accessToken}`
}
