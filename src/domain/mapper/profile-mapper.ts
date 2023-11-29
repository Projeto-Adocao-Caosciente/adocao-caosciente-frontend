import { Mapper } from './mapper'
import { ProfileResponse } from '../../data/model/profile-response'
import { UserProfileModel, UserType } from '../models/user-profile-model'
import { InvalidProfileTypeError } from '../exceptions/invalid-profile-type'
import { OngModel } from '../models/ong-model'
import { AdopterModel } from '../models/adopter-model'
import { AdopterProfileResponse } from '../../data/model/adopter-profile-response'
import { NGOProfileResponse } from '../../data/model/ngo-profile-response'

export interface ProfileMapper
    extends Mapper<Partial<ProfileResponse>, UserProfileModel> {}

export class ProfileMapperImpl implements ProfileMapper {
    map(
        profileResponse: Partial<ProfileResponse> | undefined
    ): UserProfileModel {
        let userType: UserType
        let userData: OngModel | AdopterModel

        if (profileResponse?.type == UserType.ngo) {
            userType = UserType.ngo

            const ngoData = profileResponse.user as NGOProfileResponse

            userData = <OngModel>{
                ...ngoData,
            }
        } else if (profileResponse?.type == UserType.adopter) {
            userType = UserType.adopter

            const adopterData = profileResponse.user as AdopterProfileResponse

            userData = <AdopterModel>{
                itr: adopterData.cpf,
                zipCode: adopterData.cep,
                ...adopterData,
            }
        } else {
            throw new InvalidProfileTypeError()
        }

        return {
            type: userType,
            data: userData,
        }
    }
}
