import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Domain } from '@things-factory/shell'
import { Inventory, Location } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice, DeliveryOrder, ReleaseGood, ReturnOrder } from '../entities'
import { InventoryCheck } from './inventory-check'

@Entity()
@Index('ix_order-inventory_0', (orderInventory: OrderInventory) => [orderInventory.domain, orderInventory.name], {
  unique: true
})
@Index(
  'ix_order-inventory_1',
  (orderInventory: OrderInventory) => [
    orderInventory.bizplace,
    orderInventory.inventoryCheck,
    orderInventory.inventory
  ],
  { unique: true }
)
@Index(
  'ix_order-inventory_2',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.deliveryOrder, orderInventory.inventory],
  { unique: true }
)
@Index(
  'ix_order-inventory_4',
  (orderInventory: OrderInventory) => [orderInventory.bizplace, orderInventory.releaseGood, orderInventory.deliveryOrder, orderInventory.inventory],
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

  @ManyToOne(type => Product, { nullable: true })
  product: Product

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

  @ManyToOne(type => ReturnOrder)
  returnOrder: ReturnOrder

  @Column({ nullable: true })
  originQty: number

  @Column({ nullable: true })
  inspectedQty: number

  @Column({ nullable: true, type: 'float' })
  originWeight: number

  @Column({ nullable: true, type: 'float' })
  inspectedWeight: number

  @Column({ nullable: true })
  originBatchNo: string

  @Column({ nullable: true })
  inspectedBatchNo: string

  @ManyToOne(type => Location, {
    nullable: true
  })
  originLocation: Location

  @ManyToOne(type => Location, {
    nullable: true
  })
  inspectedLocation: Location

  @Column({ nullable: true, type: 'float' })
  releaseQty: number

  @Column({ nullable: true, type: 'float' })
  releaseWeight: number

  @Column({ nullable: true, type: 'float' })
  returnQty: number

  @Column({ nullable: true, type: 'float' })
  returnWeight: number

  @Column({ nullable: true })
  actualPackQty: number

  @Column({ nullable: true })
  actualPalletQty: number

  @Column({ nullable: true })
  crossDocking: boolean

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
