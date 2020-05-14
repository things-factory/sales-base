import { JobSheet } from './job-sheet'
import { NewJobSheet } from './new-job-sheet'
import { JobSheetPatch } from './job-sheet-patch'

export const Mutation = `
  createJobSheet (
    jobSheet: NewJobSheet!
  ): JobSheet

  updateJobSheet (
    id: String!
    patch: JobSheetPatch!
  ): JobSheet

  deleteJobSheet (
    id: String!
  ): JobSheet

  publishJobSheet (
    id: String!
  ): JobSheet
`

export const Query = `
  jobSheets: [JobSheet]
  jobSheet(id: String!): JobSheet
`

export const Types = [JobSheet, NewJobSheet, JobSheetPatch]
