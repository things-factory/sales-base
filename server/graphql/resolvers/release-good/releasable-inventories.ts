import { buildQuery, ListParam } from '@things-factory/shell'
import { Inventory, INVENTORY_STATUS } from '@things-factory/warehouse-base'
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const releasableInventoriesResolver = {
  async releasableInventories(_: any, params: ListParam, context: any) {
    const INV_ALIAS: string = 'INV'
    const ARRIVAL_NOTICE_ALIAS: string = 'AN'
    const PRODUCT_ALIAS: string = 'PROD'

    const qb: SelectQueryBuilder<Inventory> = createQueryBuilder(Inventory, INV_ALIAS)
    buildQuery(qb, params, context)
    qb.select([
      `${INV_ALIAS}.batch_id as batchId`,
      `${ARRIVAL_NOTICE_ALIAS}.container_no as containerNo`,
      `${PRODUCT_ALIAS}.id as productId`,
      `${PRODUCT_ALIAS}.name as productName`,
      `${INV_ALIAS}.packing_type ad packingType`,
      `(SUM(${INV_ALIAS}.qty) - SUM(${INV_ALIAS}.locked_qty)) as remainQty`,
      `(SUM(${INV_ALIAS}.weight) - SUM(${INV_ALIAS}.locked_weight)) as remainWeight`
    ])
      .leftJoin(`${INV_ALIAS}.product`, PRODUCT_ALIAS)
      .leftJoin(
        ArrivalNotice,
        ARRIVAL_NOTICE_ALIAS,
        `CAST(${INV_ALIAS}.ref_order_id as uuid) = ${ARRIVAL_NOTICE_ALIAS}.id`
      )
      .where(`${INV_ALIAS}.status = :status`, { status: INVENTORY_STATUS.STORED })
      .andWhere(`${INV_ALIAS}.qty > 0`)

    let items: Inventory[] = await qb.getRawMany()
    items = items.map((item: Inventory) => {
      return {
        batchId: item.batchId,
        containerNo: item.containerNo,
        packingType: item.packingType,
        remainQty: item.remainQty,
        remainWeight: item.remainWeight,
        product: {
          id: item.productId,
          name: item.productName
        }
      }
    })
    const total: number = await qb.getCount()

    return { items, total }
  }
}
