import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CollectionOrder, DeliveryOrder, Product } from '.'
import { ArrivalNotice } from './arrival-notice'

@Entity()
@Index('ix_order-product_0', (orderProduct: OrderProduct) => [orderProduct.domain, orderProduct.name], {
  unique: true
})
@Index('ix_order-product_1', (orderProduct: OrderProduct) => [orderProduct.arrivalNotice, orderProduct.batchId], {
  unique: true
})
@Index('ix_order-product_2', (orderProduct: OrderProduct) => [orderProduct.arrivalNotice, orderProduct.seq], {
  unique: true
})
@Index('ix_order-product_3', (orderProduct: OrderProduct) => [orderProduct.collectionOrder, orderProduct.batchId], {
  unique: true
})
@Index('ix_order-product_4', (orderProduct: OrderProduct) => [orderProduct.collectionOrder, orderProduct.seq], {
  unique: true
})
@Index('ix_order-product_5', (orderProduct: OrderProduct) => [orderProduct.deliveryOrder, orderProduct.batchId], {
  unique: true
})
@Index('ix_order-product_6', (orderProduct: OrderProduct) => [orderProduct.deliveryOrder, orderProduct.seq], {
  unique: true
})
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain, {
    nullable: false
  })
  domain: Domain

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @ManyToOne(type => ArrivalNotice)
  arrivalNotice: ArrivalNotice

  @ManyToOne(type => CollectionOrder)
  collectionOrder: CollectionOrder

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @ManyToOne(type => Product, {
    nullable: false
  })
  product: Product

  @Column()
  seq: number

  @Column()
  batchId: string

  @Column()
  packingType: string

  @Column()
  unit: string

  @Column('float')
  weight: number

  @Column()
  packQty: number

  @Column({
    nullable: true
  })
  actualQty: number

  @Column({
    nullable: true
  })
  palletQty: number

  @Column('float')
  totalWeight: number

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
