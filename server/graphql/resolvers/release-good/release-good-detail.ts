import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { Attachment } from '@things-factory/attachment-base'
import { ATTACHMENT_TYPE } from '../../../constants/attachment-type'
import { Product } from '@things-factory/product-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getRepository, In } from 'typeorm'
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
        'arrivalNotice',
        'orderInventories',
        'orderInventories.inventory',
        'orderInventories.product',
        'orderInventories.inventory.product',
        'orderInventories.inventory.location',
        'orderVass',
        'orderVass.vas',
        'orderVass.targetProduct',
        'orderVass.inventory',
        'creator',
        'updater'
      ]
    })

    const roBizId: string = releaseGood.bizplace.id
    const shippingOrder: ShippingOrder = releaseGood.shippingOrder
    const foundAttachments: Attachment[] = await getRepository(Attachment).find({
      where: {
        domain: context.state.domain,
        refBy: releaseGood.id,
        category: ATTACHMENT_TYPE.DELIVERY_ORDER
      }
    })

    return {
      ...releaseGood,
      attachment: foundAttachments,
      shippingOrderInfo: {
        containerNo: (shippingOrder && shippingOrder.containerNo) || '',
        containerLeavingDate: (shippingOrder && shippingOrder.containerLeavingDate) || '',
        containerArrivalDate: (shippingOrder && shippingOrder.containerArrivalDate) || '',
        shipName: (shippingOrder && shippingOrder.shipName) || ''
      },
      inventoryInfos: Promise.all(
        releaseGood.orderInventories.map(async (orderInv: OrderInventory) => {
          if (orderInv?.inventory?.id) {
            const inventory: Inventory = orderInv.inventory
            return {
              id: inventory.id,
              name: inventory.name,
              batchId: inventory.batchId,
              palletId: inventory.palletId,
              product: inventory.product,
              productIdRef: inventory.product.id,
              productName: `${inventory.product.name} (${inventory.product.description})`,
              packingType: inventory.packingType,
              location: inventory.location,
              qty: inventory.qty,
              weight: inventory.weight,
              releaseQty: orderInv.releaseQty,
              releaseWeight: orderInv.releaseWeight
            }
          } else {
            const { batchId, product, packingType, releaseQty, releaseWeight } = orderInv
            const productName: string = product.name
            const { productIdRef } = await getProductId(roBizId, productName)
            const { qty, weight } = await getAvailableAmount(roBizId, productIdRef, batchId, packingType)

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
          }
        })
      )
    }
  }
}

async function getProductId(roBizId: string, productName: string): Promise<{ productIdRef: string }> {
  const foundProduct: Product = await getRepository(Product).findOne({
    where: { bizplace: roBizId, name: productName }
  })

  const productIdRef = foundProduct.id

  return { productIdRef }
}

async function getAvailableAmount(
  roBizId: string,
  productIdRef: string,
  batchId: string,
  packingType: string
): Promise<{ qty: number; weight: number }> {
  const result: any[] = await getRepository(Inventory).query(`
    WITH oi as (
      SELECT
        SUM(oi.release_qty) as release_qty,
        SUM(oi.release_weight) as release_weight,
        oi.batch_id,
        p.name as product_name,
        oi.packing_type
      FROM
        order_inventories oi
      LEFT JOIN
        products p
      ON
        oi.product_id = p.id
      WHERE
        oi.status IN ('PENDING', 'PENDING_RECEIVE', 'READY_TO_PICK', 'PICKING', 'PENDING_SPLIT') 
        AND oi.batch_id NOTNULL
        AND oi.product_id NOTNULL
        AND oi.packing_type NOTNULL
      GROUP BY
        oi.product_id,
        oi.batch_id,
        oi.packing_type,
        p.name
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
      i.bizplace_id = '${roBizId}'
      AND i.status = 'STORED'
      AND i.batch_id = '${batchId}'
      AND p.id = '${productIdRef}'
      AND i.packing_type = '${packingType}'
    GROUP BY
      i.batch_id,
      p.id,
      i.packing_type
  `)

  let qty: number = 0
  let weight: number = 0
  if (result?.length) {
    qty = result[0].qty
    weight = result[0].weight
  }

  return { qty, weight }
}
