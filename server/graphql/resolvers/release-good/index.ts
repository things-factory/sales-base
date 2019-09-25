import { releaseGoodResolver } from './release-good'
import { releaseGoodsResolver } from './release-goods'
import { releaseGoodRequestsResolver } from './release-good-requests'

import { updateReleaseGood } from './update-release-good'
import { updateMultipleReleaseGood } from './update-multiple-release-good'
import { createReleaseGood } from './create-release-good'
import { deleteReleaseGood } from './delete-release-good'
import { deleteReleaseGoods } from './delete-release-goods'
import { editReleaseGood } from './edit-release-good'
import { confirmReleaseGood } from './confirm-release-good'
import { receiveReleaseGood } from './receive-release-good'
import { generateReleaseGood } from './generate-release-good'
import { checkReleasedGood } from './check-released-good'
import { executeReleaseGood } from './execute-release-good'

export const Query = {
  ...releaseGoodsResolver,
  ...releaseGoodResolver,
  ...releaseGoodRequestsResolver
}

export const Mutation = {
  ...updateReleaseGood,
  ...updateMultipleReleaseGood,
  ...createReleaseGood,
  ...deleteReleaseGood,
  ...deleteReleaseGoods,
  ...editReleaseGood,
  ...confirmReleaseGood,
  ...receiveReleaseGood,
  ...generateReleaseGood,
  ...checkReleasedGood,
  ...executeReleaseGood
}
