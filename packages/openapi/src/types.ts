import { generateDocument } from 'openapi-metadata'

type BaseDocument = Parameters<typeof generateDocument>[0]['document']

export type OpenAPIConfig = {
  document: BaseDocument
}
