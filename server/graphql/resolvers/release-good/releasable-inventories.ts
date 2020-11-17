import { ListParam } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { getRepository, Repository } from 'typeorm'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'

interface IFilter {
  name: string
  operator?: string
  value: any
}

export const releasableInventoriesResolver = {
  async releasableInventories(_: any, params: ListParam, context: any) {
    const myBizplace: Bizplace = await getMyBizplace(context.state.user)
    const INV_ALIAS = 'INV'
    const PROD_ALIAS = 'PROD'
    const GAN_ALIAS = 'GAN'
    const conditions: IFilter[] = params?.filters
    let { batchId = null, containerNo = null, product = [], packingType = null, inventory = [] } = getConditionValues(
      conditions
    )

    const SELECT: string = `
      SELECT
        ${INV_ALIAS}.batch_id,
        ${INV_ALIAS}.packing_type,
        (SUM(COALESCE(${INV_ALIAS}.qty, 0)) - SUM(COALESCE(${INV_ALIAS}.locked_qty, 0))) as remain_qty,
        (SUM(COALESCE(${INV_ALIAS}.stdUnitValue, 0)) - SUM(COALESCE(${INV_ALIAS}.locked_std_unit_value, 0))) as remain_std_unit_value,
        ${PROD_ALIAS}.id as product_id,
        ${PROD_ALIAS}.name as product_name,
        ${GAN_ALIAS}.container_no
    `
    const FROM: string = `
      FROM
        inventories ${INV_ALIAS}
      LEFT JOIN
        products ${PROD_ALIAS}
      ON
        ${PROD_ALIAS}.id = ${INV_ALIAS}.product_id
      LEFT JOIN
        arrival_notices ${GAN_ALIAS}
      ON
        ${GAN_ALIAS}.id = CAST(${INV_ALIAS}.ref_order_id as uuid)
    `

    const WHERE: string = `
      WHERE
        ${INV_ALIAS}.status = 'STORED'
        AND ${INV_ALIAS}.qty > 0
        AND ${INV_ALIAS}.bizplace_id = '${myBizplace.id}'
        ${batchId ? `AND LOWER(${INV_ALIAS}.batch_id) LIKE '%${batchId.toLowerCase()}%'` : ''}
        ${packingType ? `AND LOWER(${INV_ALIAS}.packing_type) LIKE '%${packingType.toLowerCase()}%'` : ''}
        ${containerNo ? `AND LOWER(${GAN_ALIAS}.container_no) LIKE '%${containerNo.toLowerCase()}%'` : ''}
        ${
          product?.length > 0 && product[0]
            ? `AND ${PROD_ALIAS}.id IN (${product.map((id: string) => `'${id}'`).join(', ')})`
            : product[0] === null
            ? `AND ${PROD_ALIAS}.id isnull`
            : ''
        }
        ${
          inventory?.length > 0
            ? `
              AND (${INV_ALIAS}.batch_id, ${PROD_ALIAS}.id) ${
                params.filters.find(
                  (filter: { name: string; operator: string; value: any }) => filter.name === 'inventory'
                ).operator
              } (
                ${inventory
                  .map((inv: { batchId: string; productId: string }) => `('${inv.batchId}', '${inv.productId}')`)
                  .join(', ')}
              )
            `
            : ''
        }
    `

    // ${product?.length > 0 ? `AND ${PROD_ALIAS}.id IN (${product.map((id: string) => id ? `'${id}'` : null).join(', ')})` : ''}
    const GROUP_BY: string = `
      GROUP BY
      ${INV_ALIAS}.batch_id,
      ${INV_ALIAS}.packing_type,
      ${GAN_ALIAS}.container_no,
      ${PROD_ALIAS}.id
    `

    const OFFSET_LIMIT: string = `
        OFFSET ${params.pagination.limit * (params.pagination.page - 1)}
        LIMIT ${params.pagination.limit}
    `

    const invRepo: Repository<Inventory> = getRepository(Inventory)
    let items: Inventory[] = await invRepo.query(`
      ${SELECT} ${FROM} ${WHERE} ${GROUP_BY} ${OFFSET_LIMIT}
    `)
    items = items.map((item: Inventory) => {
      return {
        batchId: item.batch_id,
        packingType: item.packing_type,
        remainQty: item.remain_qty,
        remainStdUnitValue: item.remain_std_unit_value,
        productName: item.product_name,
        product: {
          id: item.product_id,
          name: item.product_name
        },
        containerNo: item.container_no
      }
    })

    const results: [{ total: number }] = await invRepo.query(`
      SELECT max(cnt.cnt) as total FROM (
        SELECT (ROW_NUMBER() OVER()) as cnt ${FROM} ${WHERE} ${GROUP_BY}
      ) as cnt
    `)

    return {
      items,
      total: Number(results[0].total)
    }
  }
}

function getConditionValues(
  conditions: IFilter[]
): {
  batchId?: string
  containerNo?: string
  product?: string[]
  packingType?: string
  inventory?: { batchId: string; productId: string }[]
} {
  return conditions.reduce((condition, cond: IFilter): {} => {
    condition = {
      ...condition,
      [cond.name]: cond.value
    }

    return condition
  }, {})
}
