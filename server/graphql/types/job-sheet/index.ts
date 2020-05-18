import { JobSheet } from './job-sheet'
import { NewJobSheet } from './new-job-sheet'
import { JobSheetPatch } from './job-sheet-patch'
import { JobSheetList } from './job-sheet-list'

export const Mutation = `
  createJobSheet (
    jobSheet: NewJobSheet!
  ): JobSheet

  generateJobSheet (
    jobNo: String
    containerInfo: NewJobSheet
  ): JobSheet

  updateJobSheet (
    name: String!
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
  jobSheets(
    filters: [Filter],
    pagination: Pagination,sortings: [Sorting]
  ): JobSheetList

  jobSheet(
    name: String!
  ): JobSheet
`

export const Types = [JobSheet, NewJobSheet, JobSheetList, JobSheetPatch]
