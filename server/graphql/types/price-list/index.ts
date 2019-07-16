import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewPriceList } from './new-price-list'
import { PriceList } from './price-list'
import { PriceListList } from './price-list-list'
import { PriceListPatch } from './price-list-patch'

export const Mutation = `
  createPriceList (
    priceList: NewPriceList!
  ): PriceList

  updatePriceList (
    name: String!
    patch: PriceListPatch!
  ): PriceList

  deletePriceList (
    name: String!
  ): PriceList
`

export const Query = `
  priceLists(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PriceListList
  priceList(name: String!): PriceList
`

export const Types = [Filter, Pagination, Sorting, PriceList, NewPriceList, PriceListPatch, PriceListList]
