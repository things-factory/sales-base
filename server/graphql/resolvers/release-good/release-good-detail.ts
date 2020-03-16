import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { Product } from '@things-factory/product-base'
import { getRepository, In, SelectQueryBuilder } from 'typeorm'
import { OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

export const releaseGoodDetailResolver = {
  async releaseGoodDetail(_: any, { name }, context: any) {
    const bizplaceIds: string[] = await getPermittedBizplaceIds(context.state.domain, context.state.user)
    const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(bizplaceIds)
      },
      relations: [
        'domain',
        'bizplace',
        'shippingOrder',
        'orderInventories',
        'orderInventories.inventory',
        'orderInventories.inventory.product',
        'orderInventories.inventory.location',
        'orderVass',
        'orderVass.vas',
        'orderVass.inventory',
        'creator',
        'updater'
      ]
    })

    const shippingOrder: ShippingOrder = releaseGood.shippingOrder

    return {
      ...releaseGood,
      shippingOrderInfo: {
        containerNo: (shippingOrder && shippingOrder.containerNo) || '',
        containerLeavingDate: (shippingOrder && shippingOrder.containerLeavingDate) || '',
        containerArrivalDate: (shippingOrder && shippingOrder.containerArrivalDate) || '',
        shipName: (shippingOrder && shippingOrder.shipName) || ''
      },
      inventoryInfos: Promise.all(
        releaseGood.orderInventories.map(async (orderInv: OrderInventory) => {
          const { batchId, productName, packingType, releaseQty, releaseWeight } = orderInv
          const { productIdRef } = await getProductId(bizplaceIds, productName)
          const { qty, weight } = await getAvailableAmount(bizplaceIds, productIdRef, batchId, packingType)

          return {
            batchId,
            productIdRef,
            productName,
            packingType,
            qty,
            weight,
            releaseQty,
            releaseWeight
          }
        })
      )
    }
  }
}

async function getProductId(bizplaceIds: string[], productName: string): Promise<{ productIdRef: string }> {
  const foundProduct: Product = await getRepository(Product).findOne({
    where: { bizplace: In(bizplaceIds), name: productName }
  })

  const productIdRef = foundProduct.id

  return { productIdRef }
}

async function getAvailableAmount(
  bizplaceIds: string[],
  productIdRef: string,
  batchId: string,
  packingType: string
): Promise<{ qty: number; weight: number }> {
  const [{ qty = 0, weight = 0 }] = await getRepository(Inventory).query(`
    WITH oi as (
      SELECT
        SUM(release_qty) as release_qty,
        SUM(release_weight) as release_weight,
        batch_id,
        product_name,
        packing_type
      FROM
        order_inventories
      WHERE
        status NOT IN ('TERMINATED', 'REJECTED') 
        AND batch_id NOTNULL
        AND product_name NOTNULL
        AND packing_type NOTNULL
      GROUP BY
        product_name,
        batch_id,
        packing_type
    )
    SELECT
      SUM(COALESCE(i.qty, 0)) - SUM(COALESCE(i.locked_qty, 0)) - MAX(COALESCE(oi.release_qty, 0)) as "qty",
      SUM(COALESCE(i.weight, 0)) - SUM(COALESCE(i.locked_weight, 0)) - MAX(COALESCE(oi.release_weight, 0)) as "weight"
    FROM
      inventories i
      LEFT JOIN products p on i.product_id = p.id
      LEFT JOIN oi on i.batch_id = oi.batch_id
      AND p.name = oi.product_name
      AND i.packing_type = oi.packing_type
    WHERE
      i.bizplace_id IN (${bizplaceIds.map((id: string) => `'${id}'`).join()})
      AND i.status = 'STORED'
      AND i.batch_id = '${batchId}'
      AND p.id = '${productIdRef}'
      AND i.packing_type = '${packingType}'
    GROUP BY
      i.batch_id,
      p.id,
      i.packing_type
  `)

  return { qty, weight }
}
