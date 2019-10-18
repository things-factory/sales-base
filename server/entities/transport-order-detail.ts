import { User } from '@things-factory/auth-base'
import { Domain } from '@things-factory/shell'
import { Bizplace } from '@things-factory/biz-base'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CollectionOrder } from './collection-order'
import { DeliveryOrder } from './delivery-order'

@Entity()
@Index(
  'ix_transport-order-detail_0',
  (transportOrderDetail: TransportOrderDetail) => [transportOrderDetail.domain, transportOrderDetail.name],
  { unique: true }
)
export class TransportOrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @ManyToOne(type => Bizplace)
  bizplace: Bizplace

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  type: string

  @Column('float')
  assignedLoad: number

  @ManyToOne(type => CollectionOrder)
  collectionOrder: CollectionOrder

  @ManyToOne(type => DeliveryOrder)
  deliveryOrder: DeliveryOrder

  @ManyToOne(type => TransportDriver)
  transportDriver: TransportDriver

  @ManyToOne(type => TransportVehicle)
  transportVehicle: TransportVehicle

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
