import { NGOProfileResponse } from './ngo-profile-response'
import { AdopterProfileResponse } from './adopter-profile-response'

export type ProfileResponse = {
    type: number
    user: Partial<NGOProfileResponse> | Partial<AdopterProfileResponse>
}
