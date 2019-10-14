import { Product } from '@things-factory/product-base'
import { Inventory, InventoryHistory, InventoryNoGenerator } from '@things-factory/warehouse-base'
import { getManager } from 'typeorm'

export const relabel = {
  async relabel(_: any, { product, inventory, test }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        // 1. Validate wheter inventory exists or not.
        const targetInventory: Inventory = await trxMgr.getRepository(Inventory).findOne({
          where: { ...inventory },
          relations: ['bizplace', 'product', 'warehouse', 'location']
        })
        if (!targetInventory) throw new Error(`Inventory doesn't exsits.`)

        let toProduct: Product
        if (product && product.id) {
          // 2. if there's id of product => relabel using existing product master data
          toProduct = await trxMgr.getRepository(Product).findOne(product.id)
        } else {
          // 3. if there's no id of product => relabel using new product master data
          // 3. 1) create new product data
          toProduct = await trxMgr.getRepository(Product).save({
            ...product,
            domain: context.state.domain,
            bizplace: product.bizplace ? product.bizplace : context.state.mainBizplace,
            creator: product.creator ? product.creator : context.state.user,
            updater: product.updater ? product.updater : context.state.user
          })
        }

        // 4. delete current inventory data
        await trxMgr.getRepository(Inventory).delete(targetInventory)

        // 5. insert curernt inventory history data to zero qty
        const inventoryHistory: InventoryHistory = {
          ...targetInventory,
          domain: context.state.domain,
          name: InventoryNoGenerator.inventoryHistoryName(),
          qty: 0,
          seq: targetInventory.lastSeq + 1,
          productId: targetInventory.product.id,
          warehouseId: targetInventory.warehouse.id,
          locationId: targetInventory.location.id,
          creator: context.state.user,
          updater: context.state.user
        }
        delete inventoryHistory.id
        await trxMgr.getRepository(InventoryHistory).save(inventoryHistory)

        delete targetInventory.id
        // 6. insert new inventory data using newly defined product master data
        let newInventory: Inventory = await trxMgr.getRepository(Inventory).save({
          ...targetInventory,
          name: InventoryNoGenerator.inventoryName(),
          product: toProduct,
          lastSeq: 0,
          creator: context.state.user,
          updater: context.state.user
        })

        newInventory = await trxMgr.getRepository(Inventory).findOne({
          where: { ...inventory },
          relations: ['bizplace', 'product', 'warehouse', 'location']
        })

        // 7. insert new inventory history data using newly defined product master data
        const newInventoryHistory: InventoryHistory = {
          ...newInventory,
          domain: context.state.domain,
          name: InventoryNoGenerator.inventoryHistoryName(),
          seq: newInventory.lastSeq,
          productId: newInventory.product.id,
          warehouseId: newInventory.warehouse.id,
          locationId: newInventory.location.id,
          creator: context.state.user,
          updater: context.state.user
        }
        delete newInventoryHistory.id
        await trxMgr.getRepository(InventoryHistory).save(newInventoryHistory)

        // 8. if it's for testing from customer side => rollback transaction
        if (test) {
          trxMgr.queryRunner.rollbackTransaction()
        }

        return {
          product: toProduct,
          inventory
        }
      } catch (e) {
        throw e
      }
    })
  }
}
