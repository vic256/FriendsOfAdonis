import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { generateScalarUI } from 'openapi-metadata/ui'

export default class OpenAPIController {
  async handle({ request }: HttpContext) {
    const openapi = await app.container.make('openapi')

    if (request.url().endsWith('.json')) {
      const document = await openapi.buildDocument()

      return document
    }

    return generateScalarUI('/api.json')
  }
}
