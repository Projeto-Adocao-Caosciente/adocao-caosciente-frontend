import { Authorization } from '../models/authorization'
import { AuthService } from '../../data/services/auth-service'
import { HttpStatusCode } from '../../data/http/http-client'
import { UnexpectedError } from '../exceptions/unexpected-error'
import { AuthorizationMapper } from '../mapper/authorization-mapper'
import { UserProfileModel } from '../models/user-profile-model'
import { ProfileMapper } from '../mapper/profile-mapper'

export interface AuthInteractor {
    authenticate: (user: string, password: string) => Promise<Authorization>
    profile: () => Promise<UserProfileModel>
}

export class AuthInteractorImpl implements AuthInteractor {
    constructor(
        private readonly service: AuthService,
        private readonly authMapper: AuthorizationMapper,
        private readonly profileMapper: ProfileMapper
    ) {}

    async authenticate(user: string, password: string): Promise<Authorization> {
        const authResponse = await this.service.authenticate(user, password)

        if (authResponse.statusCode == HttpStatusCode.ok) {
            const auth = this.authMapper.map(authResponse.body?.data)

            if (auth.accessToken != null) {
                return auth
            }

            throw new UnexpectedError()
        } else {
            throw new UnexpectedError()
        }
    }

    async profile(): Promise<UserProfileModel> {
        const userResponse = await this.service.profile()

        if (userResponse.statusCode == HttpStatusCode.ok) {
            return this.profileMapper.map(userResponse.body?.data)
        } else {
            throw new UnexpectedError()
        }
    }
}
