import { jobSheetResolver } from './job-sheet'
import { jobSheetsResolver } from './job-sheets'

import { generateJobSheetResolver } from './generate-job-sheet'
import { updateJobSheet } from './update-job-sheet'
import { createJobSheet } from './create-job-sheet'
import { deleteJobSheet } from './delete-job-sheet'

export const Query = {
  ...jobSheetsResolver,
  ...jobSheetResolver
}

export const Mutation = {
  ...generateJobSheetResolver,
  ...updateJobSheet,
  ...createJobSheet,
  ...deleteJobSheet
}
