import { createVas } from './create-vas'
import { deleteVas } from './delete-vas'
import { deleteVass } from './delete-vass'
import { updateMultipleVas } from './update-multiple-vas'
import { updateVas } from './update-vas'
import { vasResolver } from './vas'
import { vassResolver } from './vass'

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
