import app from '@adonisjs/core/services/app'
import { GraphQlConfig } from './types.js'

export function defineConfig(config: GraphQlConfig) {
  // By default, the introspection schema is disabled
  if (config.introspection === undefined) {
    config.introspection = app.inProduction !== true
  }

  return config
}
