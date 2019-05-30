import { priceListResolver } from './price-list'
import { priceListsResolver } from './price-lists'

import { updatePriceList } from './update-price-list'
import { createPriceList } from './create-price-list'
import { deletePriceList } from './delete-price-list'

export const Query = {
  ...priceListsResolver,
  ...priceListResolver
}

export const Mutation = {
  ...updatePriceList,
  ...createPriceList,
  ...deletePriceList
}
