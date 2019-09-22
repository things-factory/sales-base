import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain } from '@things-factory/shell'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderProduct } from './order-product'
import { OrderVas } from './order-vas'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'

@Entity()
@Index('ix_collection-order_0', (collectionOrder: CollectionOrder) => [collectionOrder.domain, collectionOrder.name], {
  unique: true
})
export class CollectionOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column()
  from: string

  @Column()
  to: string

  @Column({
    nullable: true
  })
  collectionDateTime: Date

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.collectionOrder)
  orderProducts: OrderProduct[]

  @OneToMany(type => OrderVas, orderVas => orderVas.collectionOrder)
  orderVass: OrderVas[]

  @Column({
    comment: 'FCL or LCL'
  })
  loadType: string

  @Column({
    nullable: true
  })
  truckNo: string

  @ManyToOne(type => TransportVehicle)
  transportVehicle: TransportVehicle

  @ManyToOne(type => TransportDriver)
  transportDriver: TransportDriver

  @Column({
    nullable: true
  })
  telNo: string

  @Column({
    nullable: true
  })
  remark: string

  @Column()
  status: string

  @Column({
    nullable: true
  })
  description: string

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
