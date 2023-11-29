import { UserType } from '../domain/models/user-profile-model'

export enum ProtectionRule {
    authenticated,
    adopter,
    ngo,
}

interface ProxyRuleSolverPassParams {
    isAuthenticated: boolean
    userType?: UserType
}

export interface ProxyRuleSolver {
    setRules: (rules: ProtectionRule[]) => void
    pass: (params: ProxyRuleSolverPassParams) => boolean
}

export class ProxyRuleSolverImpl implements ProxyRuleSolver {
    private protectionRules: ProtectionRule[] = [ProtectionRule.authenticated]

    pass(params: ProxyRuleSolverPassParams): boolean {
        let result = true

        this.protectionRules.forEach((rule) => {
            switch (rule) {
                case ProtectionRule.authenticated:
                    if (!params.isAuthenticated) result = false
                    break
                case ProtectionRule.adopter:
                    if (params.userType !== UserType.adopter) result = false
                    break
                case ProtectionRule.ngo:
                    if (params.userType !== UserType.ngo) result = false
                    break
                default:
                    result = false
                    break
            }
        })

        return result
    }

    setRules(rules: ProtectionRule[]): ProxyRuleSolver {
        this.protectionRules = rules
        return this
    }
}
