import { AppRoutes } from '../routes/app-routes'

export const appRouteParamReplace = (
    appRoute: AppRoutes,
    paramKey: string,
    replaceBy: string
) => appRoute.replace(paramKey, replaceBy)
