import app from '@adonisjs/core/services/app'
import type { GraphQlService } from '../src/types.js'

let graphql: GraphQlService

await app.booted(async () => {
  graphql = await app.container.make('graphql')
})

export { graphql as default }
