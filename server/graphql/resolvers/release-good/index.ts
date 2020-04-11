import { confirmReleaseGood } from './confirm-release-good'
import { createReleaseGood } from './create-release-good'
import { deleteReleaseGood } from './delete-release-good'
import { deleteReleaseGoods } from './delete-release-goods'
import { generateReleaseGood } from './generate-release-good'
import { rejectReleaseGood } from './reject-release-good'
import { releasableInventoriesResolver } from './releasable-inventories'
import { releaseGoodResolver } from './release-good'
import { releaseGoodDetailResolver } from './release-good-detail'
import { releaseGoodRequestsResolver } from './release-good-requests'
import { releaseGoodsResolver } from './release-goods'
import { updateReleaseGood } from './update-release-good'

export const Query = {
  ...releaseGoodsResolver,
  ...releaseGoodResolver,
  ...releaseGoodRequestsResolver,
  ...releaseGoodDetailResolver,
  ...releasableInventoriesResolver,
}

export const Mutation = {
  ...updateReleaseGood,
  ...createReleaseGood,
  ...deleteReleaseGood,
  ...deleteReleaseGoods,
  ...confirmReleaseGood,
  ...generateReleaseGood,
  ...rejectReleaseGood,
}
