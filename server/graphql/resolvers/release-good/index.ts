import { checkReleaseGood } from './check-release-good'
import { confirmReleaseGood } from './confirm-release-good'
import { createReleaseGood } from './create-release-good'
import { deleteReleaseGood } from './delete-release-good'
import { deleteReleaseGoods } from './delete-release-goods'
import { editReleaseGood } from './edit-release-good'
import { executeReleaseGood } from './execute-release-good'
import { generateReleaseGood } from './generate-release-good'
import { receiveReleaseGood } from './receive-release-good'
import { releaseGoodResolver } from './release-good'
import { releaseGoodRequestsResolver } from './release-good-requests'
import { releaseGoodsResolver } from './release-goods'
import { updateReleaseGood } from './update-release-good'

export const Query = {
  ...releaseGoodsResolver,
  ...releaseGoodResolver,
  ...releaseGoodRequestsResolver
}

export const Mutation = {
  ...updateReleaseGood,
  ...createReleaseGood,
  ...deleteReleaseGood,
  ...deleteReleaseGoods,
  ...editReleaseGood,
  ...confirmReleaseGood,
  ...receiveReleaseGood,
  ...generateReleaseGood,
  ...checkReleaseGood,
  ...executeReleaseGood
}
