import GraphQlServer from './server.js'
import { ApolloServerOptionsWithSchema, BaseContext } from '@apollo/server'

export type GraphQlConfig = Omit<ApolloServerOptionsWithSchema<BaseContext>, 'schema'>

export interface GraphQlService extends GraphQlServer {}

export type LazyImport<DefaultExport> = () => Promise<{
  default: DefaultExport
}>
