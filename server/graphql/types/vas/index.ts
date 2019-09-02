import { Vas } from './vas'
import { NewVas } from './new-vas'
import { VasPatch } from './vas-patch'
import { VasList } from './vas-list'

export const Mutation = `
  createVas (
    vas: NewVas!
  ): Vas @priviledge(category: "vas", priviledge: "mutation")

  updateVas (
    name: String!
    patch: VasPatch!
  ): Vas @priviledge(category: "vas", priviledge: "mutation")

  updateMultipleVas (
    patches: [VasPatch]!
  ): [Vas] @priviledge(category: "vas", priviledge: "mutation")

  deleteVas (
    name: String!
  ): Boolean @priviledge(category: "vas", priviledge: "mutation")

  deleteVass (
    names: [String]!
  ): Boolean @priviledge(category: "vas", priviledge: "mutation")
`

export const Query = `
  vass(filters: [Filter], pagination: Pagination, sortings: [Sorting]): VasList @priviledge(category: "vas", priviledge: "query")
  vas(name: String!): Vas @priviledge(category: "vas", priviledge: "query")
`

export const Types = [Vas, NewVas, VasPatch, VasList]
