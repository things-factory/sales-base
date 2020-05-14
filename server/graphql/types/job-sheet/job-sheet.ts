import { gql } from 'apollo-server-koa'

export const JobSheet = gql`
  type JobSheet {
    id: String
    name: String
    domain: Domain
    description: String
    containerMtDate: String
    containerSize: String
    adviseMtDate: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
