import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import { Inventory, Location } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice, DeliveryOrder, ReleaseGood, ShippingOrder } from '../entities'
import { InventoryCheck } from './inventory-check'

@Entity()
@Index('ix_order-inventory_0', (orderInventory: OrderInventory) => [orderInventory.domain, orderInventory.name], {
  unique: true
})
@Index(
  'ix_order-inventory_1',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.releaseGood, orderInventory.inventory],
  { unique: true }
)
@Index(
  'ix_order-inventory_2',
  (orderInventory: OrderInventory) => [
    orderInventory.bizplace,
    orderInventory.inventoryCheck,
    orderInventory.inventory
  ],
  { unique: true }
)
@Index(
  'ix_order-inventory_3',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.deliveryOrder, orderInventory.inventory],
  { unique: true }
)
export class OrderInventory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column({ nullable: true })
  type: string

  @Column({ nullable: true })
  remark: string

  @Column({ nullable: true })
  issue: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(type => Inventory, { nullable: true })
  inventory: Inventory

  @Column({ nullable: true })
  productName: string

  @Column({ nullable: true })
  batchId: string

  @Column({ nullable: true })
  packingType: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => ReleaseGood)
  releaseGood: ReleaseGood

  @ManyToOne(type => InventoryCheck)
  inventoryCheck: InventoryCheck

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @Column({ nullable: true })
  inspectedQty: number

  @Column({ nullable: true, type: 'float' })
  inspectedWeight: number

  @ManyToOne(type => Location, {
    nullable: true
  })
  inspectedLocation: Location

  @Column({ nullable: true })
  releaseQty: number

  @Column({ nullable: true, type: 'float' })
  releaseWeight: number

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User
}
