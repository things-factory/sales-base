import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './product'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'
import { ShippingOrder } from './shipping-order'

@Entity('product-batches')
@Index('ix_product-batch_0', (productBatch: ProductBatch) => [productBatch.domain, productBatch.name], { unique: true })
export class ProductBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Product, product => product.batches)
  product: Product

  @ManyToMany(type => CollectionOrder, collectionOrder => collectionOrder.productBatches)
  @JoinTable({ name: 'product_batches_collection_orders' })
  collectionOrders: CollectionOrder[]

  @ManyToMany(type => DeliveryOrder, deliveryOrder => deliveryOrder.productBatches)
  @JoinTable({ name: 'product_batches_delivery_orders' })
  deliveryOrders: DeliveryOrder[]

  @ManyToMany(type => ShippingOrder, shippingOrder => shippingOrder.productBatches)
  @JoinTable({ name: 'product_batches_shipping_orders' })
  shippingOrders: ShippingOrder[]

  @Column()
  name: string

  @Column()
  yourName: string

  @ManyToOne(type => ProductBatch, productBatch => productBatch.aliases, {
    nullable: true
  })
  refTo: Product

  @OneToMany(type => ProductBatch, productBatch => productBatch.refTo)
  aliases: Product[]

  @Column('float')
  qty: number

  @Column('float')
  palletQty: number

  @Column({ comment: 'expired or not expired' })
  status: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  packageType: string

  @Column('float', {
    nullable: true
  })
  weight: string

  @Column({
    nullable: true
  })
  unit: string

  @Column()
  expiredOn: string

  @ManyToOne(type => User, {
    nullable: true
  })
  creator: User

  @ManyToOne(type => User, {
    nullable: true
  })
  updater: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
