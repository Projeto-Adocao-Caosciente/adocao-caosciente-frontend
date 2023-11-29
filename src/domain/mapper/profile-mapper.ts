import { Mapper } from './mapper'
import { ProfileResponse } from '../../data/model/profile-response'
import { UserType } from '../models/user-profile-model'
import { InvalidProfileTypeError } from '../exceptions/invalid-profile-type'
import { OngModel } from '../models/ong-model'
import { AdopterModel } from '../models/adopter-model'
import { AdopterProfileResponse } from '../../data/model/adopter-profile-response'
import { NGOProfileResponse } from '../../data/model/ngo-profile-response'
import { UserBaseModel } from '../models/user-base-model'

export interface ProfileMapper
    extends Mapper<Partial<ProfileResponse>, UserBaseModel> {}

export class ProfileMapperImpl implements ProfileMapper {
    map(profileResponse: Partial<ProfileResponse> | undefined): UserBaseModel {
        let userType: UserType
        let userData: UserBaseModel

        if (profileResponse?.type == UserType.ngo) {
            userType = UserType.ngo

            const ngoData = profileResponse.user as NGOProfileResponse

            userData = <OngModel>{
                type: userType,
                typeName: 'ONG',
                document: ngoData.cnpj,
                photo: ngoData.logo,
                ...ngoData,
            }
        } else if (profileResponse?.type == UserType.adopter) {
            userType = UserType.adopter

            const adopterData = profileResponse.user as AdopterProfileResponse

            userData = <AdopterModel>{
                type: userType,
                typeName: 'Adotante',
                document: adopterData.cpf,
                zipCode: adopterData.cep,
                ...adopterData,
            }
        } else {
            throw new InvalidProfileTypeError()
        }

        return userData
    }
}
