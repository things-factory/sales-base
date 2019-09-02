import { vasResolver } from './vas'
import { vassResolver } from './vass'

import { updateVas } from './update-vas'
import { createVas } from './create-vas'
import { deleteVas } from './delete-vas'
import { deleteVass } from './delete-vass'
import { updateMultipleVas } from './update-multiple-vas'

export const Query = {
  ...vasResolver,
  ...vassResolver
}

export const Mutation = {
  ...updateVas,
  ...updateMultipleVas,
  ...createVas,
  ...deleteVas,
  ...deleteVass
}
