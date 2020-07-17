import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Product } from '@things-factory/product-base'
import { Domain } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ArrivalNotice, CollectionOrder, DeliveryOrder } from '../entities'

@Entity()
@Index('ix_order-product_0', (orderProduct: OrderProduct) => [orderProduct.domain, orderProduct.name], {
  unique: true
})
@Index(
  'ix_order-product_1',
  (orderProduct: OrderProduct) => [
    orderProduct.bizplace,
    orderProduct.arrivalNotice,
    orderProduct.product,
    orderProduct.batchId,
    orderProduct.packingType
  ],
  { unique: true }
)
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @ManyToOne(type => Bizplace, {
    nullable: false
  })
  bizplace: Bizplace

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  type: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => CollectionOrder)
  collectionOrder: CollectionOrder

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @ManyToOne(type => Inventory)
  fromInventory: Inventory

  @ManyToOne(type => Inventory)
  currentInventory: Inventory

  @ManyToOne(type => Inventory)
  toInventory: Inventory

  @ManyToOne(type => Product, {
    nullable: false
  })
  product: Product

  @Column()
  batchId: string

  @Column({ nullable: true })
  adjustedBatchId: string

  @Column()
  packingType: string

  @Column()
  unit: string

  @Column('float')
  weight: number

  @Column()
  packQty: number

  @Column({ nullable: true })
  actualPackQty: number

  @Column({ nullable: true })
  palletQty: number

  @Column({ nullable: true })
  actualPalletQty: number

  @Column({ nullable: true })
  totalWeight: string

  @Column({ nullable: true })
  releaseQty: number

  @Column({ nullable: true })
  releaseWeight: number

  @Column({ nullable: true })
  remark: string

  @Column({ nullable: true })
  issue: string

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(type => User, { nullable: true })
  creator: User

  @ManyToOne(type => User, { nullable: true })
  updater: User
}
