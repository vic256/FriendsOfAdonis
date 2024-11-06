export { configure } from './configure.js'
export { defineConfig } from './src/define_config.js'
export * as errors from './src/errors/main.js'
export * from 'type-graphql'
export { CurrentUser } from './src/decorators/user.js'

type MethodPropClassDecorator = PropertyDecorator & MethodDecorator & ClassDecorator

export declare function Authorized(): MethodPropClassDecorator
export declare function Authorized<RoleType = string>(
  roles: readonly RoleType[]
): MethodPropClassDecorator
export declare function Authorized<RoleType = string>(
  ...roles: readonly RoleType[]
): MethodPropClassDecorator
