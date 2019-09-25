import { ReleaseGood } from './release-good'
import { NewReleaseGood } from './new-release-good'
import { ReleaseGoodPatch } from './release-good-patch'
import { ReleaseGoodList } from './release-good-list'
import { GenerateReleaseGood } from './generate-release-good'

export const Mutation = `
  createReleaseGood (
    releaseGood: NewReleaseGood!
  ): ReleaseGood

  updateReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood

  updateMultipleReleaseGood (
    patches: [ReleaseGoodPatch]!
  ): [ReleaseGood]

  deleteReleaseGood (
    name: String!
  ): Boolean

  deleteReleaseGoods (
    names: [String]!
  ): Boolean

  generateReleaseGood (
    releaseGood: GenerateReleaseGood!
  ): ReleaseGood

  editReleaseGood (
    name: String!
    releaseGood: GenerateReleaseGood!
  ): ReleaseGood

  confirmReleaseGood (
    name: String!
  ): ReleaseGood

  receiveReleaseGood (
    name: String!
  ): ReleaseGood

  checkReleaseGood (
    name: String!
  ): ReleaseGood

  rejectReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood
`

export const Query = `
  releaseGoods(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
  releaseGood(name: String!): ReleaseGood
  releaseGoodRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
`

export const Types = [ReleaseGood, NewReleaseGood, ReleaseGoodPatch, ReleaseGoodList, GenerateReleaseGood]
