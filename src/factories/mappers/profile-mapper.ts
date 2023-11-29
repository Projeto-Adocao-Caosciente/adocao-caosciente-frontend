import {
    ProfileMapper,
    ProfileMapperImpl,
} from '../../domain/mapper/profile-mapper'

export const makeProfileMapper = (): ProfileMapper => new ProfileMapperImpl()
