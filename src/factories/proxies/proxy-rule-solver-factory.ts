import {
    ProtectionRule,
    ProxyRuleSolver,
    ProxyRuleSolverImpl,
} from '../../proxies/proxy-rule-solver'

export const makeProxyAuthenticatedRule = (): ProxyRuleSolver =>
    new ProxyRuleSolverImpl().setRules([ProtectionRule.authenticated])

export const makeProxyAdopterAuthenticatedRule = (): ProxyRuleSolver =>
    new ProxyRuleSolverImpl().setRules([
        ProtectionRule.authenticated,
        ProtectionRule.adopter,
    ])

export const makeProxyNGOAuthenticatedRule = (): ProxyRuleSolver =>
    new ProxyRuleSolverImpl().setRules([
        ProtectionRule.authenticated,
        ProtectionRule.ngo,
    ])
