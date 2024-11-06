import { Request, Response } from '@adonisjs/core/http'
import { HeaderMap, HTTPGraphQLRequest, HTTPGraphQLResponse } from '@apollo/server'

export function adonisToGraphqlRequest(request: Request): HTTPGraphQLRequest {
  const body = request.body()
  const headers = new HeaderMap()

  for (const [key, value] of Object.entries(request.headers())) {
    if (value !== undefined) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }
  }

  return {
    method: request.method().toUpperCase(),
    headers,
    search: request.parsedUrl.search ?? '',
    body,
  }
}

export function graphqlToAdonisResponse(
  response: Response,
  httpGraphqlResponse: HTTPGraphQLResponse
): void {
  for (const [key, value] of httpGraphqlResponse.headers) {
    response.header(key, value)
  }

  response.status(httpGraphqlResponse.status || 200)

  if (httpGraphqlResponse.body.kind === 'complete') {
    return response.send(httpGraphqlResponse.body.string)
  }

  throw new Error('Buffering not yet supported')
}
