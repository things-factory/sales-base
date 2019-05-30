import { PriceList } from './price-list'
import { NewPriceList } from './new-price-list'
import { PriceListPatch } from './price-list-patch'

export const Mutation = `
  createPriceList (
    priceList: NewPriceList!
  ): PriceList

  updatePriceList (
    id: String!
    patch: PriceListPatch!
  ): PriceList

  deletePriceList (
    id: String!
  ): PriceList

  publishPriceList (
    id: String!
  ): PriceList
`

export const Query = `
  priceLists: [PriceList]
  priceList(id: String!): PriceList
`

export const Types = [PriceList, NewPriceList, PriceListPatch]
